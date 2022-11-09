const { User, Service } = require('../models');
const { isValidObjectId } = require('mongoose');
// const moment = require('moment')

exports.getAll = async (req, res) => {
   try {
      const page = parseInt(req.query.page) || 1
      const limit = 10
      const skipIndex = (page - 1) * limit
      
      const users = await User.find({})
         .skip(skipIndex)
         .limit(limit)
         .sort({ createdAt: -1 })
         .populate('serviceId')

      if(!users) {
         return res.status(404).json({ message: "Foydalanuvchilar mavjud emas" })
      }

      const total = await User.countDocuments();

      res.status(200).json({
         users,
         pagination: {
            total,
            page,
            next: `/api/v1/user?page=${page + 1}`
         }
     })
   } catch (err) {
      res.status(501).json({ message: err.message })
   }
}

exports.getAllNoPage = async (req, res) => {
   try {
      const users = await User.find({})
         .populate('serviceId')
         .sort({ createdAt: -1 })
      
      if(!users) {
         return res.status(404).json({ message: "Foydalanuvchilar mavjud emas" })
      }

      res.status(200).json({ users })
   } catch (err) {
      res.status(501).json({ message: err.message })
   }
}

exports.getOne = async (req, res) => {
   try {
      const id = req.params.id

      if(!isValidObjectId(id)) {
         return res.status(400).json({ message: "Foydalanuvchi mavjud emas" })
      }

      const user = await User.findById(id);

      if(!user) {
         return res.status(404).json({ message: "Foydalanuvchi mavjud emas" })
      }

      res.status(200).json({ user })
   } catch (err) {
      res.status(501).json({ message: err.message })
   }
}

exports.register = async (req, res) => {
   try {
      const {
         fullName,
         phoneNumber,
         serviceId
      } = req.body

      console.log(serviceId);

      if(!isValidObjectId(serviceId)) {
         return res.status(400).json({ message: "Xizmat mavjud emas" })
      }

      const newUser = await User.create({
         fullName,
         phoneNumber,
         serviceId
      })

      await Service.findByIdAndUpdate(serviceId, {
         $push: {
            users: newUser._id
         }
      }, {
         new: true
      })

      res.status(201).json({ message: "Muvaffaqqiyatli ro'yxatdan o'tdingiz!", newUser })
   } catch (err) {
      res.status(501).json({ message: err.message })
   }
}