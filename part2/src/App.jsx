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
  const [vis, setVisibility] = useState(true)
  const [errcheck, setCheck] = useState(true)

  const toggleVisibility = () => setVisibility(!vis);

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

  const Notif = ({message}) =>{
    if(!message){return null}
    const styles ={
      color: errcheck ? 'green' : 'red',
      border: `2px solid ${errcheck ? 'green' : 'red'}`,
      background: errcheck ? 'rgba(0,128,0,0.2)' : 'rgba(128,0,0,0.2)',
      borderRadius: '5px',
      display: vis ? 'block' : 'none',
    }

    return (
      <div style={styles}>{message}</div>
    );
  }

  const addName = (e) => {
    e.preventDefault();
    /*
    [IMP] if a person exists, update them, otherwise add them
    */
    const existingPerson = persons.find(person => person.name === newName);
    if (existingPerson) {
      if (window.confirm(`${newName} is already in the phonebook. Do you want to update their number?`)) {
        BackEnd.updatePerson(existingPerson.id, newName, newNumber).then(updatedPerson => {
          setPersons(persons.map(person => 
            person.id !== updatedPerson.id ? person : updatedPerson
          ));
          setCheck(true);
          if(vis==false) toggleVisibility();
          setNotifMessage('Person updated successfully');
          
          setTimeout(() => {
            setNotifMessage('');
            if(vis!=false) toggleVisibility(); toggleVisibility();
          }, 5000);
          
        }).catch(error => {
          setCheck(false);
          setNotifMessage('ERROR UPDATING ENTRY');
          
          setTimeout(() => {
            setNotifMessage('');
            if(vis!=false) toggleVisibility();
          }, 5000);
        });
      }
    } else { 
      BackEnd.addPerson(newName, newNumber).then(newPerson => {
        setPersons(persons.concat(newPerson));
        setNewName('');
        setNewNumber('');
        setCheck(true);
        if(vis==false) toggleVisibility();
        setNotifMessage('Person added successfully');
        
        setTimeout(() => {
          setNotifMessage('');
          if(vis!=false) toggleVisibility();
        }, 5000);
      }).catch(error => {
        setCheck(false);
        setNotifMessage('ERROR ADDING ENTRY');
        
        setTimeout(() => {
          if(vis!=false) toggleVisibility();
          setVisibility('hidden');
        }, 5000);
      });
    }
  };
  
  
  const deletePerson = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      BackEnd.deletePerson(id).then(() => {
        setPersons(prevPersons => prevPersons.filter(person => person.id !== id));
        if(id == null){
          setCheck(false);
          setNotifMessage(`Information of ${person.name} has already been removed from server`);
        }
      });
    }
  };  
  
  const filteredPersons = persons.filter(person => 
    person.name && person.name.toLowerCase().includes((finder || '').toLowerCase())
  );

  return (
    <div>
      <Notif message={errorMessage}/>
      <h2>Phonebook</h2>
      <Filter finder={finder} findName={findName} />

      <h3>Add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} inputChange={inputChange} inputChange_num={inputChange_num} addName={addName} />

      <h3>Numbers</h3>
      <Persns persons={filteredPersons} del={deletePerson}/>
    </div>
  );
};

export default App;