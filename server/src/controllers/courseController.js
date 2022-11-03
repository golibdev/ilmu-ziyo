const { Course } = require('../models');
const { isValidObjectId } = require('mongoose');
const fs = require('fs')
const path = require('path')

exports.getAll = async (req, res) => {
   try {
      const courses = await Course.find({}).populate('students')

      if(!courses) {
         return res.status(404).json({ message: 'Kurslar mavjud emas' })
      }

      res.status(200).json({ courses });
   } catch (err) {
      res.status(501).json({ message: err.message })
   }
}

exports.getOne = async (req, res) => {
   try {
      const id = req.params.id;

      if(!isValidObjectId(id)) {
         return res.status(400).json({ message: "Kurs mavjud emas" })
      }

      const course = await Course.findById(id);

      if(!course) {
         return res.status(404).json({ message: 'Kurs mavjud emas' })
      }

      res.status(200).json({ course })
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

      const course = await Course.findOne({ title });

      if(course) {
         return res.status(400).json({ message: "Bunday kurs oldin ro'yxatdan o'tkazilgan" })
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

      image.name = `course_photo_${Date.now()}${path.parse(image.name).ext}`;

      image.mv(`public/uploads/${image.name}`, async (err) => {
         if(err) {
            return res.status(500).json({ message: 'Fayl yuklashda xatolik yuz berdi!' })
         }
      })

      const host = req.get('host');

      const newCourse = new Course({
         title,
         description,
         image: `${req.protocol}://${host}/uploads/${image.name}`
      })

      await newCourse.save()

      res.status(201).json({ message: "Kurs muvaffaqqiyatli yaratildi", course: newCourse });
   } catch (err) {
      res.status(500).json({ message: err.message })
   }
}

exports.update = async (req, res) => {
   try {
      const id = req.params.id

      if(!isValidObjectId(id)) {
         return res.status(400).json({ message: 'Kurs mavjud emas' });
      }

      const course = await Course.findById(id);

      if(!course) {
         return res.status(404).json({ message: 'Kurs mavjud emas' })
      }

      if(req.files) {
         const oldImage = course.image;
         const oldImageName = oldImage.split('/uploads/')[1]

         if(oldImage) {
            fs.unlinkSync(`public/uploads/${oldImageName}`)
         }

         const image = req.files.image;

         if(!image.mimetype.startsWith('image')) {
            return res.status(400).json({ message: "Faqat rasm yuklang" });
         }

         if(image.size > process.env.MAX_FILE_SIZE) {
            return res.status(400).json({ message: "Rasm hajmi 2mb dan oshib ketdi" });
         }

         image.name = `course_photo_${Date.now()}${path.parse(image.name).ext}`;

         image.mv(`public/uploads/${image.name}`, async (err) => {
            if(err) {
               return res.status(500).json({ message: 'Fayl yuklashda xatolik yuz berdi!' })
            }
         })

         const host = req.get('host');

         await Course.findByIdAndUpdate(id, {
            image: `${req.protocol}://${host}/uploads/${image.name}`
         })
      }

      if(req.body.title) {
         const course = await Course.findOne({ title: req.body.title });

         if(course?._id != id) {
            if(course) {
               return res.status(400).json({ message: 'Bunday kurs mavjud' })
            }
         }

         await Course.findByIdAndUpdate(id, { title: req.body.title })
      }

      await Course.findByIdAndUpdate(id, {
         description: req.body.description ? req.body.description : course.description
      })
      res.status(200).json({ message: "Kurs muvaffaqqiyatli tahrirlandi" });
   } catch(err) {
       res.status(501).json({ message: err.message })
   }
}