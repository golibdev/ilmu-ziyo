const { Service } = require('../models');
const { isValidObjectId } = require('mongoose');
const fs = require('fs')
const path = require('path')

exports.getAll = async (req, res) => {
   try {
      const services = await Service.find({}).populate('users')

      if(!services) {
         return res.status(404).json({ message: 'Xizmatlar mavjud emas' })
      }

      res.status(200).json({ services });
   } catch (err) {
      res.status(501).json({ message: err.message })
   }
}

exports.getOne = async (req, res) => {
   try {
      const id = req.params.id;

      if(!isValidObjectId(id)) {
         return res.status(400).json({ message: "Xizmat mavjud emas" })
      }

      const service = await Service.findById(id);

      if(!service) {
         return res.status(404).json({ message: 'Xizmat mavjud emas' })
      }

      res.status(200).json({ service })
   } catch (err) {
      res.status(501).json({ message: err.message })
   }
}

exports.create = async (req, res) => {
   try {
      const {
         title,
         description
      } = req.body

      const service = await Service.findOne({ title });

      if(service) {
         return res.status(400).json({ message: "Bunday xizmat oldin ro'yxatdan o'tkazilgan" })
      }

      if(!req.files) {
         return res.status(400).json({ message: "Fayl yuklanmagan" });
      }

      const image = req.files.image;

      if(!image.mimetype.startsWith('image')) {
         return res.status(400).json({ message: "Faqat rasm yuklang" });
      }

      if(image.size > process.env.MAX_FILE_SIZE) {
         return res.status(400).json({ message: "Rasm hajmi 2mb dan oshib ketdi" });
      }

      image.name = `service_photo_${Date.now()}${path.parse(image.name).ext}`;

      image.mv(`public/uploads/services/${image.name}`, async (err) => {
         if(err) {
            return res.status(500).json({ message: 'Fayl yuklashda xatolik yuz berdi!' })
         }
      })

      const newService = new Service({
         title,
         description,
         image: `/uploads/services/${image.name}`
      })

      await newService.save()

      res.status(201).json({ message: "Xizmat muvaffaqqiyatli yaratildi", service: newService });
   } catch (err) {
      res.status(500).json({ message: err.message })
   }
}

exports.update = async (req, res) => {
   try {
      const id = req.params.id

      if(!isValidObjectId(id)) {
         return res.status(400).json({ message: 'Xizmat mavjud emas' });
      }

      const service = await Service.findById(id);

      if(!service) {
         return res.status(404).json({ message: 'Xizmat mavjud emas' })
      }

      if(req.files) {
         const oldImage = service.image;
         const oldImageName = oldImage.split('/uploads/services/')[1]

         if(oldImage) {
            fs.unlinkSync(`public/uploads/services/${oldImageName}`)
         }

         const image = req.files.image;

         if(!image.mimetype.startsWith('image')) {
            return res.status(400).json({ message: "Faqat rasm yuklang" });
         }

         if(image.size > process.env.MAX_FILE_SIZE) {
            return res.status(400).json({ message: "Rasm hajmi 2mb dan oshib ketdi" });
         }

         image.name = `service_photo_${Date.now()}${path.parse(image.name).ext}`;

         image.mv(`public/uploads/services/${image.name}`, async (err) => {
            if(err) {
               return res.status(500).json({ message: 'Fayl yuklashda xatolik yuz berdi!' })
            }
         })

         await Service.findByIdAndUpdate(id, {
            image: `/uploads/services/${image.name}`
         })
      }

      if(req.body.title) {
         const service = await Service.findOne({ title: req.body.title });

         if(service?._id != id) {
            if(course) {
               return res.status(400).json({ message: 'Bunday xizmat mavjud' })
            }
         }

         await Service.findByIdAndUpdate(id, { title: req.body.title })
      }

      await Service.findByIdAndUpdate(id, {
         description: req.body.description ? req.body.description : course.description
      })
      res.status(200).json({ message: "Xizmat muvaffaqqiyatli tahrirlandi" });
   } catch(err) {
       res.status(501).json({ message: err.message })
   }
}