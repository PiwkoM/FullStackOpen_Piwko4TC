import axios from "axios";

// Get all persons
const getPersons = () => {
  return axios.get('http://localhost:3001/persons').then(response => response.data);
};

// Add a new person
const addPerson = (newName, newNumber) => {
  const personObject = {
    name: newName,
    number: newNumber,
  };
  return axios.post('http://localhost:3001/persons', personObject).then(response => response.data);
};

// Update a person's phone number (PUT method)
const updatePerson = (id, newNumber) => {
  const updatedPerson = { number: newNumber };
  return axios.put(`http://localhost:3001/persons/${id}`, updatedPerson)
    .then(response => response.data);
};

// Delete a person by ID
const deletePerson = (id) => {
  return axios.delete(`http://localhost:3001/persons/${id}`)
    .then(() => {
      console.log(`Person with ID ${id} deleted successfully.`);
    })
    .catch(error => {
      console.error('Error deleting person:', error);
      alert('Failed to delete the person');
    });
};

export default { addPerson, getPersons, updatePerson, deletePerson };
