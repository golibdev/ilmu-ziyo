const {model, Schema} = require('mongoose')
const { schemaOptions } = require('./schemaOptions')

const serviceSchema = new Schema({
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
   users: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
   }]
}, schemaOptions)

module.exports = model('Service', serviceSchema)