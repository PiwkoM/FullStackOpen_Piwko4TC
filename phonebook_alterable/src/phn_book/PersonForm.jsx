const PersonForm = ({ newName, newNumber, inputChange, inputChange_num, addName }) => {
    return (
      <form onSubmit={addName}>
        <div>
          <div>name: <input value={newName} onChange={inputChange} /></div>
          <div>number: <input value={newNumber} onChange={inputChange_num} /></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
  }
  
  export default PersonForm
  