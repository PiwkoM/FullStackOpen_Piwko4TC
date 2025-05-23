import axios from "axios";

/*
  axios commands: get, put, post
  % .get() just gets stuff from the url, go figure
  !--------------------------------------------------------------------------!
  [IMP] while post and put may look similar, they are fundamentally different
  EX: .put(x,y) = put/replace entry [y] in [x]
  EX: .post(x,y) = add entry [y] to [x]
*/
const baseURL = '/api/persons'

const getPersons = () => {
  return axios.get(baseURL).then(response => response.data);
};

const addPerson = (newName, newNumber) => {
  const personObject = {
    name: newName,
    number: newNumber,
  };
  return axios.post(baseURL, personObject).then(response => response.data);

};

// update via PUT
const updatePerson = (id, newName, newNumber) => {
  const updatedPerson = {name:newName, number: newNumber };
  var tete = baseURL+'/'+ {id}
  return axios.put(tete, updatedPerson)
    .then(response => response.data);

};
      /*
      !! deletion doesnt actually update the persons list, but at the same time it does, 
      resulting in error message from 2.17* not popping up and browser 2 not recognizing the fact (\n)
      [IMP] browser 1 deleted the entry.

      [TODO]: call a function to update the list after deletion (???)
      */

const deletePerson =  async (id) => {
  const prsn = ( await axios.get(`http://localhost:3001/persons/${id}`)).data.name;
    try {
      await axios.delete(`http://localhost:3001/persons/${id}`);
      console.log(`Person with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting person:', error);
      alert(error.response ? `Failed to delete the person: ${error.response.data.message}` : 'Failed to delete the person');
    }
};

export default { addPerson, getPersons, updatePerson, deletePerson};