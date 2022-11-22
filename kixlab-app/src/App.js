import './App.css';
import React, { useEffect, useState } from 'react'
import getData, { postData } from './Data.ts';

const ThreeTasks = () => {
  const [answers, setAnswers] = useState([]);
  const [distractors, setDistractors] = useState([]);
  const [isAnswer, setIsAnswer] = useState(true);

  // Initially getting the data from the endpoints.
  useEffect(() => {
    getData()
    .then((response) => response.json())
    .then((data) => { 
      setAnswers([...data['answers']]);
      setDistractors([...data['distractors']]);
    })
  }, []);

  // Update the list whenever a submission is made on the website.
  function updateList() {
    let newOptionAdded = document.getElementById('option').value;

    if (document.getElementById('answer').checked) {
      setIsAnswer(true);
      postData(newOptionAdded, isAnswer)
      .then((response) => response.json())
      .then((data) => {
        if (data['success']) {
          setAnswers([...answers, newOptionAdded])
        }
        else {
          alert("The POST function returned False")
        }
      })
    }
    else {
      setIsAnswer(false);
      postData(newOptionAdded, isAnswer)
      .then((response) => response.json())
      .then((data) => {
        if (data['success']) {
          setDistractors([...distractors, newOptionAdded])
        }
        else {
          alert("The POST function returned False")
        }
      })
    }
  }

  // Design the frontend of the website. 
  return (
    <div className="App overall">
      <h4> Answers </h4>
      {answers.map(function(item, index){ console.log(item); return <div className="box" key={index}>{item}</div> })}
      <h4> Distractors </h4>
      {distractors.map(function(item, index){ console.log(item); return <div className="box" key={index}>{item}</div> })}
      <h4> Create a New Option </h4>
      <div className="text_input">
        <input type="text" className="between" id="option" placeholder="Type your option here..." name="newOption"></input>
        <input type="radio" className="between" id="answer" name="category" readOnly></input><b>Answer</b>
        <input type="radio" className="between" id="distractor" name="category" readOnly></input><b>Distractor</b>
      </div>
      <input type="submit" className="between" value="Submit" onClick={ updateList }></input>

    </div>
  )
}

function App() {
  return (
    <div className="App">
      <ThreeTasks/>
    </div>
  );
}

export default App;
