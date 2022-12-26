import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import {useState} from 'react'

function App() {
  let [link,setLink] = useState('http://localhost:8000/user/download/file')
  async function update(){
    let data = await axios.get(link)
    console.log(data);
  }
  return (
    <>
      <button onClick={update}>
        {link}
      </button>
    </>
  );
}

export default App;
