
import './App.css';
import {useState, useEffect} from 'react'

function App() {
  
  const [phrase, setPhrase] = useState("")

  useEffect(() => {
    fetch('https://api.hatchways.io/assessment/sentences/1')
    .then(resp => resp.json())
    .then(data => {
   
      setPhrase(data.data.sentence)
    })
    }, [])

  console.log(phrase)
  
  
  return (
    <div className="App">
      <h1>{phrase}</h1>
    </div>
  );
}

export default App;
