import axios from 'axios';
// import BackEnd from './BackEnd';

const Persons = ({ persons, deletePerson }) => {
  return (
    <div> 
      {persons.map(p => (
        <div key={p.id}>
          {p.name} {p.number} 
          <button onClick={() => BackEnd.deletePerson(p.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
