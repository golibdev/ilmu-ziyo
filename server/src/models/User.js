const {model, Schema} = require('mongoose')
const { schemaOptions } = require('./schemaOptions')

const userSchema = new Schema({
   fullName: {
      type: String,
      required: true
   },
   phoneNumber: {
      type: String,
      required: true
   },
   serviceId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Service'
   }
}, schemaOptions)

module.exports = model('User', userSchema)