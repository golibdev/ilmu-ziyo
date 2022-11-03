const {model, Schema} = require('mongoose')
const { schemaOptions } = require('./schemaOptions')

const studentSchema = new Schema({
   fullName: {
      type: String,
      required: true
   },
   phoneNumber: {
      type: String,
      required: true
   },
   courseId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Course'
   },
   status: {
      type: Number,
      required: true,
      enum: [1, 2, 3],
      default: 1
   }
}, schemaOptions)

module.exports = model('Student', studentSchema)