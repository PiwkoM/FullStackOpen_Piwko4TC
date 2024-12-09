import axios from "axios"

const getPersons = () => {
  return axios.get('http://localhost:3001/persons').then(response => response.data)
}

const addPerson = (newName, newNumber) => {
  const personObject = {
    name: newName,
    number: newNumber,
  }
  return axios.post('http://localhost:3001/persons', personObject).then(response => response.data)
}

export default { addPerson, getPersons }
