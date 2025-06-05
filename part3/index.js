const express = require('express')
const app = express()
const cors = require('cors')
const Person = require('./models/person')
var morgan = require('morgan')

require('dotenv').config()
morgan.token('person-data', (req) => JSON.stringify(req.body));
morgan.token('res-content-length', (req, res) => res.get('content-length') || '-'); 

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())
app.use(morgan(':method :url :status :res-content-length :response-time ms :person-data'));

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler) // !! make sure this is the last .use in the file

app.get('/', (request, response) => {
  response.send('<h1>Server or something</h1>')
})

app.get('/api/persons',(request,response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person =>{
    if(person){
      response.json(person)
    } else {
      response.status(404).end()
    }
  }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id).then(result => {
    response.status(204).end()
  }).catch(error => next(error))
})

app.post('/api/persons/', (request, response) => {
  const body = request.body
  
  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'name or number missing' });
  }
  

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  })

  newPerson.save().then(nP => {
    response.json(nP)
  })

});
app.get('/info', (request, response, next) => {
  Person.countDocuments({}).then(count => {
    const date = new Date();
    response.send(`
      <p>Phonebook has info for ${count} people</p>
      <p>${date.toString()}</p>
    `);
  }) .catch(error => next(error));
});
  

app.put('/api/persons/:id', (request,response, next) => {
  const {name, number} = request.body

  Person.findByIdAndUpdate(request.params.id,{ name, number },{ new: true, runValidators: true, context: 'query' })
  .then(updatedPerson => {
    if (!updatedPerson) {
      return response.status(404).end();
    }
  response.json(updatedPerson);
  }).catch(error => next(error));

})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})