import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: "55-44-55-44" }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const inputChange = (event) => {
    setNewName(event.target.value)
  }

  const inputChange_num = (event) => {
    setNewNumber(event.target.value)
  }
  
  const addName = (e) =>{
    e.preventDefault()
    console.log(newName)
    if(persons.some(person => person.name === newName) || persons.some(person => person.number === newNumber)){
      alert(`${newName} or ${newNumber} is already added to phonebook`)
    } else { setPersons(persons.concat({name: newName, number: newNumber})) }
    setNewName('')
    setNewNumber('')
    {
      /* 
        .some() iterates through array and check if object meets requirement specified
        after the '=>' symbol
      */
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map(p => (<div key={p.name}>{p.name} {p.number} </div>))}
    </div>
  )
}

export default App