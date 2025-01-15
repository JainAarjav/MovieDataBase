

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [movieTitle, setMovieTitle] = useState('');
  const [movieData, setMovieData] = useState(null);
  const [error, setError] = useState('');

  const API_URL = 'http://www.omdbapi.com/?apikey=a6066d5';

  const fetchMovieData = async () => {
    if (!movieTitle) return;

    try {
      const response = await axios.get(`${API_URL}&t=${movieTitle}`);
      if (response.data.Response === 'True') {
        setMovieData(response.data);
        setError('');
      } else {
        setMovieData(null);
        setError(response.data.Error);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while fetching data.');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovieData();
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Movie Database</h1>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Enter movie title"
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </header>

      {error && <p className="error">{error}</p>}

      {movieData && (
        <div className="movie-details">
          <h2>{movieData.Title}</h2>
          <p><strong>Year:</strong> {movieData.Year}</p>
          <p><strong>Genre:</strong> {movieData.Genre}</p>
          <p><strong>Director:</strong> {movieData.Director}</p>
          <p><strong>Actors:</strong> {movieData.Actors}</p>
          <p><strong>IMDB Rating:</strong> {movieData.imdbRating}</p>
          <p><strong>Plot:</strong> {movieData.Plot}</p>
          <img src={movieData.Poster} alt={movieData.Title} />
        </div>
      )}
    </div>
  );
}

export default App;
