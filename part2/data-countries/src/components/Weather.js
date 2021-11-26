import axios from 'axios';
import React, {useState, useEffect} from 'react';

const api_key = process.env.REACT_APP_API_KEY;
const WeatherDetails = ({temp, main}) => {
    return(
        <div>
            <p><b>Temperature: </b>{temp.temp}℃</p>
            <p><b>Feels like: </b>{temp.feels_like}℃</p>
            {
                main.map(data => 
                    <div key={data.id}>
                        <p id="general">{data.main}</p>
                        <img src={`https://openweathermap.org/img/w/${data.icon}.png`} alt={data.description}></img>
                    </div>
                    )
            }
        </div>
    )
}
const Weather = ({capital}) => {
    const [weatherData, setWeatherData] = useState([]);
    const [temperature, setTemperature] = useState({});
    //check if the link works
    const [work, setWork] = useState(true)
    useEffect(() => {
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
        .then(response => {
            setWeatherData(response.data.weather)
            setTemperature(response.data.main)
        })
        .catch(error => setWork(false))
    }, [capital])
    return(
        <div>
            <h2>Weather in {capital}</h2>
            {
                work
                ? <WeatherDetails temp={temperature} main={weatherData}/>
                : <p>No data collected !</p>
            }
        </div>
    )
}

export default Weather;