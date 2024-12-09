const Persons = ({ persons }) => {

    return (
      <div>
        {persons.map(p => (
          <div key={p.name}>{p.name} {p.number} <button onClick={delUser(p.id)}>delete</button></div>
        ))}
      </div>
    )
  }
  
  export default Persons
  