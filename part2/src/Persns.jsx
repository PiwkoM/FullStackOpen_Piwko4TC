import axios from 'axios';

const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.map(p => (
        <div key={p.id}>
          {p.name} {p.number} 
          <button onClick={() => deletePerson(p.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
