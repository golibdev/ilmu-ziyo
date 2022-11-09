const { Student, User, Service, Course } = require('../models');

exports.summary = async (req, res) => {
   try {
      const totalStudents = await Student.countDocuments();
      const totalUsers = await User.countDocuments();
      const totalCourses = await Course.countDocuments();
      const totalServices = await Service.countDocuments();

      const newStudent = await Student.find({ status: 1 });
      const resolve = await Student.find({ status: 2 });
      const reject = await Student.find({ status: 3 });

      const summary = {
         course: {
            total: totalCourses
         },
         service: {
            total: totalServices
         },
         student: {
            total: totalStudents,
            new: newStudent.length,
            resolve: resolve.length,
            reject: reject.length
         },
         user: {
            total: totalUsers
         }
      }

      res.status(200).json({ summary })
   } catch (err) {
      res.status(501).json({ message: err.message })
   }
}