import axios from 'axios';
import { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [data, setData] = useState({
    temperature:0 ,
    localtime: "",
    weather_icons: "",
    weather_descriptions: "",
    wind_speed: 0,
    wind_dir: ""
  })

  const handleCity = (e) => {
    setCity(e.target.value)
  }
  const handleApi = () => {
    axios.get(`http://api.weatherstack.com/current?access_key=1ece24b904a5eafd48efcd8831cd56cc&query=${city}`)
      .then((res) => {
        console.log(res);
        setData({
          temperature: `Temp: ${res.data.current.temperature}°C` ,
          localtime: `Time: ${res.data.location.localtime}`,
          weather_icons: `${res.data.current.weather_icons[0]}`,
          weather_descriptions:[`${res.data.current.weather_descriptions}`],
          wind_speed: `Wind speed: ${res.data.current.wind_speed} m/s`,
          wind_dir: `Wind Direction: ${res.data.current.wind_dir}`,
        })
      })
  }
  
  return (
    <>
    <div className='input-field'>
      <input type="text" value={city} onChange={handleCity} />
      <button onClick={handleApi}>Check Weather</button>
    </div>
    <div className="App">
      <div className="main">
        <div className="showdata">
          <div className='row'>
            <div>{data.temperature}</div>
            <div>{data.localtime}</div>
          </div>
          <div className=''>
            <div><img src={data.weather_icons} alt="img"/></div>
            <div>{data.weather_descriptions}</div>
          </div>
          <div className='row'>
            <div>{data.wind_speed}</div>
            <div>{data.wind_dir}</div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
