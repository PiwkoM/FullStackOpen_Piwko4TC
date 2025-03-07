import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0);
  const [countries, setCountries] = useState([]); // Renaming state variable to countries
  const [find, setFind] = useState('');
  const [filtered, setFiltered] = useState([]);

  const fetchCountries = () => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => {
        setCountries(response.data); 
      })
      .catch(error => console.error('Error fetching countries:', error));
  };

  useEffect(() => {
    fetchCountries(); 
  }, []); 

  const test = (e) => {
    const searchTerm = e.target.value.trim();  // Trim any extra spaces from the input
    setFind(searchTerm);  // Update the 'find' state
  
    setFiltered(countries
      .filter(country => 
        country.name.common && 
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())  // Case-insensitive search
      )
      .map(p => p.name.common)
    );
    console.log(filtered);  // Logging the filtered countries
  }
  

  const Sett = () =>{
    if(filtered.length < 10 && filtered.length != 0){
      return(
      <p>
        {filtered.map(filtr => (<p key={filtr}>{filtr}</p>))}
      </p>
    )
    } else if(find == '' || find == null){
      
    } else 
  }

  return (
    <>
      <div>
        test <input onChange={test}/>
        <Sett/>
      </div>
    </>
  );
}

export default App;
