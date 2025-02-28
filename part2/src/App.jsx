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
  const [errorMessage, setNotifMessage] = useState('')
  const [vis, setVisibility] = useState('hidden')
  const [errcheck, setCheck] = useState(true)

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



  const Notification = ({ message, errcheck, vis }) => {
    if (!message) return null;
  
    const NotStyles = {
      color: errcheck ? 'green' : 'red',
      border: `2px solid ${errcheck ? 'green' : 'red'}`,
      background: errcheck ? 'rgba(0, 128, 0, 0.068)' : 'rgba(128, 0, 0, 0.068)',
      borderRadius: '5px',
      visibility: vis, 
    };
  
    return <div style={NotStyles}>{message}</div>;
  };



  // const addName = (e) => {
  //   e.preventDefault();
    
  //   /*
  //   >be me 
  //   >try to update number and name of person
  //   >omit name entirely and only add number
  //   >complain app doesnt work
  //   */

  //   const existingPerson = persons.find(person => person.name === newName);
  //   if (existingPerson) {
  //     if (window.confirm(`${newName} is already in the phonebook. Do you want to update their number?`)) {
  //       BackEnd.updatePerson(existingPerson.id, newName, newNumber).then(updatedPerson => {
  //         setPersons(persons.map(person => 
  //           person.id !== updatedPerson.id ? person : updatedPerson
  //         ));
  //         setCheck(true)
  //         setVisibility('visible')
  //         setNotifMessage('Person updated successfuly ')
  //         setTimeout(()=>{setNotifMessage(null)},5000)
          
  //       }).catch(error => {
  //         setCheck(false)
  //         setVisibility('visible')
  //         setNotifMessage('ERROR UPDATING ENTRY')
  //         setTimeout(()=>{setNotifMessage(null),5000})
  //       });
  //     }
  //   } else {
  //     BackEnd.addPerson(newName, newNumber).then(newPerson =>
  //     {
  //       setPersons(persons.concat(newPerson));
  //       setNewName('');
  //       setNewNumber('');
  //     });
  //   }
  // };
  
  const filteredPersons = persons.filter(person => 
    person.name && person.name.toLowerCase().includes((finder || '').toLowerCase())
  );

  return (
    <div>
      <Notification message={errorMessage} />
      <h2>Phonebook</h2>
      <Filter finder={finder} findName={findName} />

      <h3>Add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} inputChange={inputChange} inputChange_num={inputChange_num} addName={BackEnd.addName()} />

      <h3>Numbers</h3>
      <Persns persons={filteredPersons} />
    </div>
  );
};

export default App;
