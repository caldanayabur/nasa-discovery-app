import { useState } from 'react';
import './App.css';

const API_KEY = import.meta.env.VITE_NASA_API_KEY;

function App() {
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [banList, setBanList] = useState([]);
  const [history, setHistory] = useState([]);

  const addBan = (attribute) => {
    if (!banList.includes(attribute)) {
      setBanList([...banList, attribute]);
    }
  };

  const removeBan = (attribute) => {
    setBanList(
      banList.filter((item) => item !== attribute)
    );
  };

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

    const photo = data[0];
    
    const year = photo.date.slice(0, 4);

    const month =
      monthNames[
        Number(photo.date.slice(5, 7)) - 1
      ];

    const author = photo.copyright;

    console.log("DATA:", data);

    setCurrentPhoto(photo);
  };

  console.log("CURRENT PHOTO:", currentPhoto);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  return (
    <div>
      <h1>NASA Explorer 🚀</h1>

      <button onClick={getPhoto}>
        Discover
      </button>

      <h2>Ban List</h2>

      {banList.map((attribute) => (
        <p
          key={attribute}
          onClick={() => removeBan(attribute)}
        >
          {attribute}
        </p>
      ))}

      {currentPhoto && (
        <div>
          <h2>{currentPhoto.title}</h2>

          <img
            src={currentPhoto.url}
            alt={currentPhoto.title}
            width="500"
          />

          <p
            onClick={() => addBan(currentPhoto.date.slice(0, 4))}
          >
            Year: {currentPhoto.date.slice(0, 4)}
          </p>

          <p
            onClick={() => 
              addBan(
                monthNames[
                  Number(currentPhoto.date.slice(5, 7)) - 1
                ]
              )
            }
          >
            Month: {
              monthNames[
                Number(currentPhoto.date.slice(5, 7)) - 1
              ]
            }
          </p>
          
          {currentPhoto.copyright && (
            <p
            onClick={() => addBan(currentPhoto.copyright)}
            >
              Author: {currentPhoto.copyright}
            </p>
          )}

          <p>
            Explanation: {currentPhoto.explanation}
          </p>

        </div>
      )}
    </div>
  );
}

export default App;
