import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([]); 
  const [filteredData, setFilteredData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [capital, setCapital] = useState('');
  const [weather, setWeather] = useState(null);

  const fetchCountries = () => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => {
        setCountries(response.data); 
      })
      .catch(error => console.error('Error fetching countries:', error));
  };

  const api_key = '';

  useEffect(() => {
    fetchCountries(); 
  }, []);

  useEffect(() => {
    if(api_key == ''){console.log("no api key :3")}
    if (capital) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
        .then(response => setWeather(response.data))
        .catch(error => console.error('Error fetching country weather', error));
    }
  }, [capital,api_key]);

  const Finder = (e) => {
    const searchTerm = e.target.value.trim();
    setFilteredData(countries.filter(
      country => country.name.common && country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    ).map(
      p => [p.name.common, p.capital, p.area, p.languages, p.flags.png, p.flags.alt]
    ));
    if (selectedIndex !== null) {
      setSelectedIndex(null);
    }
  };

  const Sett = () => {
    if (filteredData.length === 0) {
      return null;
    }
  
    if (filteredData.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    }

    if (filteredData.length === 1 || (filteredData.length > 1 && selectedIndex !== null)) {
      const data = (filteredData.length === 1 ? filteredData[0] : filteredData[selectedIndex]);
      setCapital(data[1]);
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
          {weather && <p>Temperature: {weather.main.temp} Celsius</p>}
          <img
            src = {weather && `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            style={{
              backgroundColor: "rgba(55,55,55,125)",
              border: "2px solid white",
              padding: "10px",
            }}
          />
          {weather && <p>Wind: {weather.wind.speed} m/s</p>}
        </div>
      );
    }
    return (
      <div>
        {filteredData.map((item, index) => (
          <div key={item[0]}>
            <p>{item[0]}</p>
            <button onClick={() => setSelectedIndex(index)}>Show Info</button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div>
        test <input onChange={Finder} />
        <Sett />
      </div>
    </div>
  );
}

export default App;
