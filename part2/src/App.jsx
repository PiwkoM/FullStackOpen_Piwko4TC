import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persns'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [finder, setFinder] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
      .catch(error => {
        console.error('There was an error fetching the data:', error)
      })
  }, [])

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
    if (persons.some(person => person.name === newName) || persons.some(person => person.number === newNumber)) {
      alert(`${newName} or ${newNumber} is already added to phonebook`)
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }))
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
      <Filter finder={finder} findName={findName} />

      <h3>Add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} inputChange={inputChange} inputChange_num={inputChange_num} addName={addName} />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App
