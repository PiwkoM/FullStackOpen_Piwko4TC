import axios from "axios";

/*
  axios commands: get, put, post
  *[IMP] while post and put may look similar, they are fundamentally different

*/



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

// update via PUT
const updatePerson = (id, newName, newNumber) => {
  const updatedPerson = {name:newName, number: newNumber };
  return axios.put(`http://localhost:3001/persons/${id}`, updatedPerson)
    .then(response => response.data);
    
};


const deletePerson =  async (id) => {
  const prsn = ( await axios.get(`http://localhost:3001/persons/${id}`)).data.name;
  if(confirm(`Are you sure you want to delete ${prsn}`)){
    try {
      await axios.delete(`http://localhost:3001/persons/${id}`);
      console.log(`Person with ID ${id} deleted successfully.`);

      /*
      !! deletion doesnt actually update the persons list, but at the same time it does, 
      resulting in error message from 2.17* not popping up and browser 2 not recognizing the fact 
      * [IMP] browser 1 deleted the entry.

      todo: call a function to update the list after deletion (???)
      */

    } catch (error) {
      console.error('Error deleting person:', error);
      alert(error.response ? `Failed to delete the person: ${error.response.data.message}` : 'Failed to delete the person');
    }
  } else {
    console.log(`Removal of ${id} terminated`)
  }
};

export default { addPerson, getPersons, updatePerson, deletePerson };