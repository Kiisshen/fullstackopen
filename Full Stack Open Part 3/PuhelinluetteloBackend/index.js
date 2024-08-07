require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())

morgan.token('body', (req) => JSON.stringify(req.body))
const customFormat = ':method :url :status :res[content-length] - :response-time ms :body'
app.use(morgan(customFormat))

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }else if (error.name === 'NotFoundError') {
    return response.status(404).json({error: error.message})
  }
  next(error)
}

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  const body = req.body
  const person = {
    name: body.name,
    number: body.number
  }
  Person.findByIdAndUpdate(id, person, { new: true })
    .then(updatedPerson => {
      if (updatedPerson) {
        res.json(updatedPerson)
      } else {
        res.status(404).send({ error: 'Person not found' })
      }
    })
    .catch(error => next(error))
})


app.post('/api/persons', (req, res, next) => {
  const body = req.body
  const newPerson = new Person({
    name: body.name,
    number: body.number,
    id: String(Math.floor(Math.random()*10000))
  })
  newPerson.save().then(() => {
    res.json(newPerson)
  })
    .catch((error) => next(error))
})

app.get('/api/persons', (req, res) => {
  Person.find().then(person => {
    res.json(person)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  const personToFind = Person.findById(id).then(person => {
    if(personToFind){
      res.json(person)
    }
    else{
      res.status(404).end()
    }
  })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findByIdAndDelete(id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.get('/info', (req, res) => {
  Person.find().then(persons => {
    res.send(`Phonebook has info for ${persons.length} people. \n ${Date()}`)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.use(errorHandler)