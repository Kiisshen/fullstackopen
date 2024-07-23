const mongoose = require('mongoose')
const url = process.env.MONGOURL

mongoose.set('strictQuery', false)
mongoose.connect(url).then(() => {
  console.log('Connected to MongoDB')
}).catch((error) => {
  console.log('error connection to MongoDB: ', error.message)
})

const personSchema = new mongoose.Schema({
  name: { type: String, minlength: 3 },
  number: { type: String, validate: {
    validator: function(v) {
      return /^\d{3}-\d{5,}$|^\d{2}-\d{6,}$/.test(v)
    }, }
  },
  id: String
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)