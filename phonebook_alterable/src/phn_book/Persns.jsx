import axios from 'axios';
import BackEnd from './BackEnd';
import Button from 'react-bootstrap/Button';

const Persons = ({ persons, deletePerson }) => {
  return (
    <div> 
      {persons.map(p => (
        <div key={p.id}>
          {p.name} {p.number} 
          <Button variant="danger" onClick={() => BackEnd.deletePerson(p.id)}>delete</Button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
