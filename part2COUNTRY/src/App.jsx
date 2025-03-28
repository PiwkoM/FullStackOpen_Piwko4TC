import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0);
  const [countries, setCountries] = useState([]); // Renaming state variable to countries
  const [find, setFind] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

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
    setFilteredData(countries.filter(
        country => country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    ).map(
      p => [p.capital, p.area, p.languages, p.flags.png,p.flags.alt]
    ));
    console.clear()
    console.log("COUNTRY NAME:\n"+filtered + "\n---------------------------------"); 
    console.log("COUNTRY DATA:\n"+filteredData + "\n---------------------------------");
    console.log(filteredData[0][2]);

  }
  

  const Sett = () =>{
    if(filtered.length < 10 && filtered.length != 0){
      if((filtered[0] == find || filtered.length == 1)){
        const data = {...filteredData[0]}
        const languages = data[2]
        return(
          <div>
            <h1>{filtered[0]}</h1>
            <p>Capital: {data[0]}</p>
            <p>Area: {data[1]}</p>
            <h1>Languages</h1>
            <ul>
            {
              //Object.entries() basically returns an array containing the values of ex. a dictionary/tuple 
              Object.entries(languages).map(([abbreviation,language]) => (
                <li key={abbreviation}>{language}</li>
              ))
            }
            </ul>
            <img src={data[3]} alt={data[4]}/>
          </div>
        )
      }
      return(
        <p>
          {filtered.map(filtr => (<p key={filtr}>{filtr}</p>))}
        </p>
      )
    } else {
      if(find == '' || find == null){
        return null;
      }
      return <p> Too many matches, specify another filter </p>
    }
  }

  return (
    <>
      <div>
        test <input onChange={test}/>
        <Sett/>
      </div>
    </>
  );
};

export default App;
