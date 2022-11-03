const CryptoJS = require('crypto-js')
const { Admin } = require('../models')
const jwt = require('jsonwebtoken');
const { isValidObjectId } = require('mongoose')

exports.login = async (req, res) => {
   try {
      const {
         username,
         password
      } = req.body

      const admin = await Admin.findOne({ username })

      if(!admin) {
         return res.status(400).json({ message: "Username yoki parol noto'g'ri"})
      }

      const decryptedPass = CryptoJS.AES.decrypt(
         admin.password,
         process.env.PASSWORD_SECRET_KEY
      ).toString(CryptoJS.enc.Utf8)

      if(password !== decryptedPass) {
         return res.status(400).json({ message: "Username yoki parol noto'g'ri" })
      }

      const token = jwt.sign({
         id: admin._id
      }, process.env.TOKEN_SECRET_KEY)

      admin.password = undefined

      res.status(200).json({ token, admin })
   } catch (err) {
      res.status(501).json({ message: err.message })
   }
}

exports.update = async (req, res) => {
   try {
      const id = req.params.id

      if(!isValidObjectId(id)) {
         return res.status(400).json({ message: 'error_id' })
      }

      const admin = await Admin.findById(id);

      if(!admin) {
         return res.status(404).json({ message: 'Admin  topilmadi' })
      }

      if(req.body.password) {
         const encryptedPassword = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASSWORD_SECRET_KEY
         ).toString()

         await Admin.findByIdAndUpdate(id, { password: encryptedPassword });
      }

      if(req.body.username) {
         const adminExist = await Admin.findOne({ username: req.body.username });

         if(adminExist) {
            return res.status(400).json({ message: 'bunday' })
         }

         await Admin.findByIdAndUpdate(id, { username: req.body.password })
      }

      await Admin.findByIdAndUpdate(id, { fullname: req.body.fullname ? req.body.fullname : admin.fullName })

      res.status(200).json({ message: 'success_updated' })
   } catch(err) {
      res.status(501).json({ message: err.message })
   }
}