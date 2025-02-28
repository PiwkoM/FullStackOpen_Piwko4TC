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

const addName = (e) => {
  e.preventDefault();
  
  /*
  >be me 
  >try to update number and name of person
  >omit name entirely and only add number
  >complain app doesnt work
  */

  const existingPerson = persons.find(person => person.name === newName);
  if (existingPerson) {
    if (window.confirm(`${newName} is already in the phonebook. Do you want to update their number?`)) {
      BackEnd.updatePerson(existingPerson.id, newName, newNumber).then(updatedPerson => {
        setPersons(persons.map(person => 
          person.id !== updatedPerson.id ? person : updatedPerson
        ));
        setCheck(true)
        setVisibility('visible')
        setNotifMessage('Person updated successfuly ')
        setTimeout(()=>{setNotifMessage(null)},5000)
        
      }).catch(error => {
        setCheck(false)
        setVisibility('visible')
        setNotifMessage('ERROR UPDATING ENTRY')
        setTimeout(()=>{setNotifMessage(null),5000})
      });
    }
  } else {
    BackEnd.addPerson(newName, newNumber).then(newPerson =>
    {
      setPersons(persons.concat(newPerson));
      setNewName('');
      setNewNumber('');
    });
  }
};


export default { addPerson, getPersons, updatePerson, deletePerson };
