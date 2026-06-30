import { useState } from 'react';
import './App.css';

const API_KEY = import.meta.env.VITE_NASA_API_KEY;

function App() {
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [banList, setBanList] = useState([]);
  const [history, setHistory] = useState([]);

  const getPhoto = async () => {
    const url = 
      `https://api.nasa.gov/planetary/apod?count=1&api_key=${API_KEY}`;

    const response = await fetch(url);

    console.log(response.status);

    if (!response.ok) {
      console.log("Error:", response.status);
      return;
    }

    const data = await response.json();

    console.log("DATA:", data);

    setCurrentPhoto(data[0]);
  };

  console.log("CURRENT PHOTO:", currentPhoto);

  return (
    <div>
      <h1>NASA Explorer 🚀</h1>

      <button onClick={getPhoto}>
        Discover
      </button>

      {currentPhoto && (
        <div>
          <h2>{currentPhoto.title}</h2>

          <img
            src={currentPhoto.url}
            alt={currentPhoto.title}
            width="500"
          />

          <p>Date: {currentPhoto.date}</p>

          <p>Media Type: {currentPhoto.media_type}</p>
          
          {currentPhoto.copyright && (
            <p>Author: {currentPhoto.copyright}</p>
          )}

          <p>{currentPhoto.explanation}</p>
        </div>
      )}
    </div>
  );
}

export default App;
