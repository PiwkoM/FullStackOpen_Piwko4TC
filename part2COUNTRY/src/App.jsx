import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([]); 
  const [find, setFind] = useState('');
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
    const searchTerm = e.target.value.trim();
    setFind(searchTerm);

    setFilteredData(countries.filter(
      country => country.name.common && country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    ).map(
      p => [p.name.common,p.capital, p.area, p.languages, p.flags.png, p.flags.alt]
    ));

    console.clear();
    console.log("COUNTRY DATA:\n" + filteredData);
  };



  const Sett = () => {
    if (filteredData.length < 10 && filteredData.length !== 0) {
      if (filteredData.length === 1) {
        // Automatically show info for the single filtered country
        const data = {...filteredData[0]}
        console.log(data)
        return (
          <div>
            <h1>{data[0]}</h1>
            <p>Capital: {data[1]}</p>
            <p>Area: {data[2]}</p>
            <h1>Languages</h1>
            <ul>
              {Object.entries(data[3]).map(([abbreviation, language]) => (
                <li key={abbreviation}>{language}</li>
              ))}
            </ul>
            <img src={data[4]} alt={data[5]} />
          </div>
        );
      }
      return (
        <div>
          {
            filteredData.map(item => (
              <p>{item[0]}</p>
            ))
          }
        </div>
      );
    } else {
      if (!find) return null;
      return <p>Too many matches, specify another filter</p>;
    }
  };

  return (
    <div>
      <div>
        test <input onChange={test} />
        <Sett />
      </div>
    </div>
  );
}

export default App;