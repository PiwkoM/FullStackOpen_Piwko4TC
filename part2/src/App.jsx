import { useState, useEffect } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persns from './Persns';  
import BackEnd from './BackEnd';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [finder, setFinder] = useState('');

  useEffect(() => {
    BackEnd.getPersons().then(response => {
      setPersons(response);
    }).catch(error => {
      console.error('There was an error fetching the data:', error);
    });
  }, []);

  const inputChange = (event) => {
    setNewName(event.target.value);
  };

  const inputChange_num = (event) => {
    setNewNumber(event.target.value);
  };

  const findName = (event) => {
    setFinder(event.target.value);
  };

  const addName = (e) => {
    e.preventDefault();
    
    const existingPerson = persons.find(person => person.name === newName);
    if (existingPerson) {
      if (window.confirm(`${newName} is already in the phonebook. Do you want to update their number?`)) {
        BackEnd.updatePerson(existingPerson.id, newNumber).then(updatedPerson => {
          setPersons(persons.map(person => 
            person.id !== updatedPerson.id ? person : updatedPerson
          ));
        }).catch(error => {
          console.error('Error updating person:', error);
          alert('Failed to update the phone number');
        });
      }
    } else {
      BackEnd.addPerson(newName, newNumber).then(newPerson => {
        setPersons(persons.concat(newPerson));
        setNewName('');
        setNewNumber('');
      });
    }
  };
  
  const filteredPersons = persons.filter(person => 
    person.name && person.name.toLowerCase().includes((finder || '').toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter finder={finder} findName={findName} />

      <h3>Add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} inputChange={inputChange} inputChange_num={inputChange_num} addName={addName} />

      <h3>Numbers</h3>
      <Persns persons={filteredPersons} />
    </div>
  );
};

export default App;
