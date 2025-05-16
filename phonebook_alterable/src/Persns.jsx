import axios from 'axios';
import Button from 'react-bootstrap/Button';

const Persons = ({ persons, deletePerson }) => {
  return (
    <div> 
      {persons.map(p => (
        <div key={p.id}>
          {p.name} {p.number} 
          <Button variant="danger" onClick={deletePerson}>delete</Button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
