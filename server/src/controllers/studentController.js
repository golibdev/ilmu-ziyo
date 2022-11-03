const { Student, Course } = require('../models');
const { isValidObjectId } = require('mongoose');
// const moment = require('moment')

exports.getAll = async (req, res) => {
   try {
      const page = parseInt(req.query.page) || 1
      const limit = 10
      const skipIndex = (page - 1) * limit
      
      const students = await Student.find({})
         .skip(skipIndex)
         .limit(limit)
         .sort({ createdAt: -1 })
         .populate('courseId')

      if(!students) {
         return res.status(404).json({ message: "O'quvchilar mavjud emas" })
      }

      const total = await Student.countDocuments();

      res.status(200).json({
         students,
         pagination: {
            total,
            page,
            next: `/api/v1/student?page=${page + 1}`
         }
     })
   } catch (err) {
      res.status(501).json({ message: err.message })
   }
}

exports.getOne = async (req, res) => {
   try {
      const id = req.params.id

      if(!isValidObjectId(id)) {
         return res.status(400).json({ message: "O'quvchi mavjud emas" })
      }

      const student = await Student.findById(id);

      if(!student) {
         return res.status(404).json({ message: "O'quvchi mavjud emas" })
      }

      res.status(200).json({ student })
   } catch (err) {
      res.status(501).json({ message: err.message })
   }
}

exports.register = async (req, res) => {
   try {
      const {
         fullName,
         phoneNumber,
         courseId
      } = req.body

      if(!isValidObjectId(courseId)) {
         return res.status(400).json({ message: "Kurs mavjud emas" })
      }

      const newStudent = await Student.create({
         fullName,
         phoneNumber,
         courseId
      })

      await Course.findByIdAndUpdate(courseId, {
         $push: {
            students: newStudent._id
         }
      }, {
         new: true
      })

      res.status(201).json({ message: "Muvaffaqqiyatli ro'yxatdan o'tdingiz!", newStudent })
   } catch (err) {
      res.status(501).json({ message: err.message })
   }
}

exports.updateStatus = async (req, res) => {
   try {
      const id = req.params.id

      if(!isValidObjectId(id)) {
         return res.status(400).json({ message: "O'quvchi mavjud emas" })
      }

      const { status } = req.body

      const statusArr = [1, 2, 3]

      const isValidStatus = (status) => {
         return statusArr.some(item => item === status)
      }

      console.log(status);

      console.log(isValidStatus(status));

      if(!isValidStatus(status)) {
         return res.status(404).json({ message: 'Bunday status mavjud emas' })
      }

      await Student.findByIdAndUpdate(id, { status }, { new: true });

      res.status(200).json({ message: "Muvaffaqqiyatli o'zgartirildi" });
   } catch (err) {
      res.status(501).json({ message: err.message })
   }
}