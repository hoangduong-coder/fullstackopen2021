/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const uniqueValidator = require ('mongoose-unique-validator')

dotenv.config()
const url = process.env.MONGO_URL

mongoose.connect(url)
  .then(result => {
    console.log('Connected successfully')
  })
  .catch(error => {
    console.log(error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, '{VALUE} is too short. Name length must be at least 3 characters.']
  },
  phone: {
    type: String,
    required: true,
    minlength: [8, '{VALUE} is too short. Phone length must be at least 8 digits.']
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

personSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Person', personSchema)
