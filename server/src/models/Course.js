const {model, Schema} = require('mongoose')
const { schemaOptions } = require('./schemaOptions')

const courseSchema = new Schema({
   title: {
      type: String,
      required: true,
      unique: true
   },
   description: {
      type: String,
      required: true
   },
   image: {
      type: String,
      required: true
   },
   students: [{
      type: Schema.Types.ObjectId,
      ref: 'Student'
   }]
}, schemaOptions)

module.exports = model('Course', courseSchema)