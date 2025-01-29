import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const fetchWeather = async (e) => {
    e.preventDefault();
    if (!city) {
      setError("Please enter a city.");
      return;
    }

    const apiKey = '07461bec94f3e2dc77b1cce7f14dc368'; // Replace with your own API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(url);
      setWeather(response.data);
      setError(null); // Clear any previous errors
    } catch (err) {
      setError("City not found."); // Handle invalid city
      setWeather(null);
    }
  };

  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      <form onSubmit={fetchWeather} className="weather-form">
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city name"
          className="city-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {error && <div className="error">{error}</div>}

      {weather && (
        <div className="weather-info">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p className="temperature">{weather.main.temp}°C</p>
          <p className="description">{weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default App;