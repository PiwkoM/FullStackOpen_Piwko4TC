import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [finder, setFinder] = useState('')

  const inputChange = (event) => {
    setNewName(event.target.value)
  }

  const inputChange_num = (event) => {
    setNewNumber(event.target.value)
  }

  const findName = (event) => {
    setFinder(event.target.value)
  }

  const addName = (e) => {
    e.preventDefault()
    if(persons.some(person => person.name === newName) || persons.some(person => person.number === newNumber)){
      alert(`${newName} or ${newNumber} is already added to phonebook`)
    } else { 
      setPersons(persons.concat({name: newName, number: newNumber})) 
    }
    setNewName('')
    setNewNumber('')
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(finder.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <input value={finder} onChange={findName} placeholder="Search by name" />
      <h2>Add a new number </h2>
      <form onSubmit={addName}>
        <div>
          <div>name: <input value={newName} onChange={inputChange}/></div>
          <div>number: <input value={newNumber} onChange={inputChange_num}/></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map(p => (
        <div key={p.name}>{p.name} {p.number} </div>
      ))}
    </div>
  )
}

export default App


{/* {persons.map(p => (<div key={p.name}>{p.name} {p.number} </div>))} */}