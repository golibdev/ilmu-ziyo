const { Student } = require('../models');

exports.summary = async (req, res) => {
   try {
      const total = await Student.countDocuments();

      const newStudent = await Student.find({ status: 1 });
      const resolve = await Student.find({ status: 2 });
      const reject = await Student.find({ status: 3 });

      const summary = {
         newStudent,
         resolve: resolve.length,
         reject: reject.length
      }

      res.status(200).json({ summary })
   } catch (err) {
      res.status(501).json({ message: err.message })
   }
}