
import './App.css';
import {useState, useEffect} from 'react'

function App() {
  
  const [phrase, setPhrase] = useState("")
  const [guess, setGuess] = useState([{
    //id: 1,
    word: ""
  }])

  useEffect(() => {
    fetch('https://api.hatchways.io/assessment/sentences/1')
    .then(resp => resp.json())
    .then(data => {
   
      setPhrase(data.data.sentence)
    })
    }, [])

  //console.log(phrase)

  let arrayOfWords = phrase.split(" ")
  //console.log(arrayOfWords)

  function shuffleWord(word) {
    word = word.split('');
  
    //Remove the first and the last letter
    let first = word.shift();
    let last = word.pop();
  
    //Shuffle the remaining letters
    for (let i = word.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [word[i], word[j]] = [word[j], word[i]];
    }
  
    //Append and return
    return first + word.join("") + last;
  }

 let shuffled = arrayOfWords.map(item => {
   if (item.length > 1) {

     return shuffleWord(item)
   }
   else {
     return item
   }
 })

 //console.log(shuffled.join(" "))

 let shuffledPhrase = shuffled.join(" ")

 function handleChange(e, i) {
   const inputValues = [...guess]
   inputValues[i][e.target.name] = e.target.value
    setGuess(inputValues)
    console.log(inputValues)
 }

 let inputGenerator = shuffled.map((item, i) => {
    return  <input onChange={e => handleChange(e, i)} value={guess.word} name="word" type="text"></input>
 })
  
  
  return (
    <div className="App">
      <h1>{shuffledPhrase}</h1>

      <div>
        {inputGenerator}
        <button>Next</button>
      </div>
    </div>
  );
}

export default App;
