import React, { useState } from 'react'

const Weather = () => {

    const api = {
        key: "0af3a975314f6387bd8b83d9d5181058",
        base: "https://api.openweathermap.org/data/2.5/"
    }

    const [query, setQuery] = useState('');
    const [weather, setWeather]= useState({});

    const search =  e => {
        if(e.key === 'Enter') {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
            .then(res => res.json())
        .then(result => {
            setWeather(result);
            setQuery('');
            console.log(result);
        });
    }
}
    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }
  return (
    <div>
    <main>
        <div className='search-box'>
            <input type="text" 
                className='search-bar w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500' 
                placeholder='Search...'
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyPress={search}/>
        </div>
        {(typeof weather.main != "undefined")?(
            <div>
            <div className="location-box">
                <div className="location">
                {weather.name}, {weather.sys.country}
                </div>
                <div className="date">
                {dateBuilder(new Date())}
                </div>
            </div>
            <div className="weather-box">
                <div className="temp">{Math.round(weather.main.temp)}°C</div>
            </div>
            <div className="weather">{weather.weather[0].main}</div>
        </div>
        ): ('Please enter Correct place name!')}
        
    </main>
    </div>
  )
}

export default Weather