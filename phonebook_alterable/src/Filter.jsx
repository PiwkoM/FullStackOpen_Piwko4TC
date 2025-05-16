const Filter = ({ finder, findName }) => {
    return (
      <div>
        <input value={finder} onChange={findName} placeholder="Search by name" />
      </div>
    )
  }
  
  export default Filter
  