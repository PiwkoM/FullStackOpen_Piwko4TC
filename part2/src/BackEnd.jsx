import axios from "axios";

const getPersons = () => {
  return axios.get('http://localhost:3001/persons').then(response => response.data);
};

const addPerson = (newName, newNumber) => {
  const personObject = {
    name: newName,
    number: newNumber,
  };
  return axios.post('http://localhost:3001/persons', personObject).then(response => response.data);

};

// Update a person's phone number (PUT method)
const updatePerson = (id, newName, newNumber) => {
  const updatedPerson = {name:newName, number: newNumber };
  return axios.put(`http://localhost:3001/persons/${id}`, updatedPerson)
    .then(response => response.data);
    
};


/*!!! doesnt refresh page, maybe due to async? !!!*/
const deletePerson =  async (id) => {
  const prsn = ( await axios.get(`http://localhost:3001/persons/${id}`)).data.name;
  if(confirm(`Are you sure you want to delete ${prsn}`)){
    try {
      await axios.delete(`http://localhost:3001/persons/${id}`);
      console.log(`Person with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting person:', error);
      alert(error.response ? `Failed to delete the person: ${error.response.data.message}` : 'Failed to delete the person');
    }
  } else {
    console.log(`Removal of ${id} terminated`)
  }
};

export default { addPerson, getPersons, updatePerson, deletePerson };
