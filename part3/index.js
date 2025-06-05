const express = require('express')
const app = express()
const cors = require('cors')
const Person = require('./models/person')
var morgan = require('morgan')

require('dotenv').config({path: 'dotenv.env'})
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

// let persons = [
//   { 
//     id: "1",
//     name: "Arto Hellas", 
//     number: "040-123456"
//   },
//   { 
//     id: "2",
//     name: "Ada Lovelace", 
//     number: "39-44-5323523"
//   },
//   { 
//     id: "3",
//     name: "Dan Abramov", 
//     number: "12-43-234345"
//   },
//   { 
//     id: "4",
//     name: "Mary Poppendieck", 
//     number: "39-23-6423122"
//   },
//   {
//     id:"5",
//     name:"Wally West",
//     number: "12-34-56789"
//   }
// ]

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
  // const body = request.body;

  // if (!body.name || !body.number) {
  //   return response.status(400).json({ error: 'missing data' });
  // }

  // if (persons.find(n => n.name === body.name)) {
  //   return response.status(400).json({ error: 'name must be unique' });
  // }

  // const newPerson = {
  //   id: Math.floor(Math.random() * 2137 + (persons.length - 1)),
  //   name: body.name || "Placeholder",
  //   number: body.number || "11-22-33-44-55"
  // };

  // persons = persons.concat(newPerson);
  // response.json(newPerson);
  const body = request.body
  if(!body.content){
    return response.status(404).json({error: 'content missing'})
  }

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  })

  newPerson.save().then(nP => {
    response.json(nP)
  })

});

app.get('/info',(request,response) => {
  const date = new Date();
  response.send(`
  <p>Phonebook has info for ${persons.length} people</p>
  <p>${date.toString()} </p>
  `)

})

app.put('/api/persons/:id', (request,response, next) => {
  const {name, number} = request.body

  Person.findByIdAndUpdate(request.params.id).then(person => {
    if(!person){
      return response.status(404).end()
    } 

    person.name = name;
    person.number = number;

    return person.save().then((updatedPerson) =>{
      response.json(updatedPerson)
    })
  }).catch(error => next(error))
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})