const http = require('http')
const express = require('express')
const app = express()

let persons = [
  { 
    id: "1",
    name: "Arto Hellas", 
    number: "040-123456"
  },
  { 
    id: "2",
    name: "Ada Lovelace", 
    number: "39-44-5323523"
  },
  { 
    id: "3",
    name: "Dan Abramov", 
    number: "12-43-234345"
  },
  { 
    id: "4",
    name: "Mary Poppendieck", 
    number: "39-23-6423122"
  }
]
app.get('/', (request, response) => { // localhost:3001/ , this is what appears upon entering the root of the -SERVER-, since it's hosted on port 3001 and sth like 5013
  response.send('<h1>Testing</h1>')
})

app.get('/api/persons',(request,response) => {
  response.json(persons)
})

app.get('/info',(request,response) => {
  const date = new Date();
  response.send(`
  <p>Phonebook has info for ${persons.length} people</p>
  <p>${date.toString()} </p>
  `)

})

// app.get('/api/persons/:id', (request, response) => {
//   const id = request.params.id
//   const note = persons.find(persons => persons.id === id)
  

//   if (persons) {
//     response.json(persons)
//   } else {
//     response.status(404).end()
//   }
// })

// app.delete('/api/persons/:id', (request, response) => {
//   const id = request.params.id
//   persons = persons.filter(persons => persons.id !== id)

//   response.status(204).end()
// })

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})