import { useState } from 'react'
import './App.css'

const API_KEY = import.meta.env.VITE_NASA_API_KEY;

function App() {
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [banList, setBanList] = useState([]);
  const [history, setHistory] = useState([]);

  return (
    <div>
      <h1>Mars Discovery 🚀</h1>
    </div>
  );
}

export default App;
