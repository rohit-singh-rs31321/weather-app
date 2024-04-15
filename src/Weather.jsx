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
    <div className={(typeof weather.main != "undefined") 
    ? ((weather.main.temp > 16) 
        ? 'app warm' : 'app'): 'app'}>
    <main className='container h-screen w-screen  mx-auto text-center '>
        <div className='search-box flex justify-center items-center'>
            <input type="text" 
                className='search-bar w-3/5 mt-20  my-4 py-4 px-4 text-lg rounded-md focus:outline-none focus:ring focus:border-blue-500 shadow-lg' 
                placeholder='Search...'
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyPress={search}/>
        </div>
        {(typeof weather.main != "undefined")?(
            <div>
            <div className="location-box m-20">
                <div className="location text-6xl font-medium tracking-wider">
                {weather.name}, {weather.sys.country}
                </div>
                <div className="date font-mono text-xl mt-2">
                {dateBuilder(new Date())}
                </div>
            </div>
            <div className="weather-box px-10 py-6  brightness-125 backdrop-blur-sm bg-white/30 border border-blue-200 inline-block rounded-xl shadow-lg shadow-indigo-500/50 ">
                <div className="temp text-7xl font-bold">{Math.round(weather.main.temp)}°C</div>
                <div className="text-xs text-slate-600 inline-block mr-4 mt-3"><span className='text-xxs'>Min:</span>{weather.main.temp_min}°C</div>
                <div className="text-xs  text-slate-600 inline-block"><span className='text-xxs'>Max:</span>{weather.main.temp_max}°C</div>
            </div>
            <div className="weather font-medium font-mono text-3xl text-orange-950 tracking-wide mt-9">{weather.weather[0].main}</div>
        </div>
        ): ("")}
        
    </main>
    </div>
  )
}

export default Weather