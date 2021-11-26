/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const dotenv = require('dotenv')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))
dotenv.config()

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(requestLogger)

app.use(morgan(':method :url :status :response-time ms :body'))
morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(obj => {
    res.json(obj)
  })
})

app.get('/api/persons/:id',(req, res, next) => {
  Person.findById(req.params.id)
    .then(user => {
      user ? res.json(user) : res.status(400).end()
    })
    .catch(error => next(error))
})

app.get('/info', (req, res) => {
  Person.find({}).then(obj => {
    res.send(`<p>Phonebook has info for ${obj.length} people<br>${new Date ()}</p>`)
  })
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body
  const person = new Person({
    name: body.name,
    phone: body.phone
  })
  person.save()
    .then(savedPerson => {
      res.json(savedPerson.toJSON())
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).json()
    })
    .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.put('/api/persons/:id', (req,res) => {
  const body = req.body
  const newPerson = {
    name: body.name,
    phone: body.phone
  }
  Person.findByIdAndUpdate(req.params.id, newPerson, { new: true })
    .then(result => {
      res.json(result)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log (`Server is running on port ${PORT}`)
})
