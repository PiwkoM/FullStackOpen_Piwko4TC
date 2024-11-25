import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const inputChange = (event) => {
    setNewName(event.target.value)
  }
  
  const addName = (e) =>{
    e.preventDefault()
    console.log(newName)
    if(persons.some(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
    } else { setPersons(persons.concat({name: newName})) }
    setNewName('')
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        {/*onSubmit={addName} */}
        <div>
          name: <input value={newName} onChange={inputChange}/>
          {/* name: <input/> */}
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(p => (<div key={p.name}>{p.name} </div>))}
        {/* {persons.map(persons => (
         <Person key={persons.name} p={persons.name}/>
        ))} */}
    </div>
  )
}

export default App