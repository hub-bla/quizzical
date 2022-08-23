import { useEffect, useState } from 'react'
import {nanoid} from 'nanoid'
import {decode} from 'html-entities'
import Question from './components/Question'
import './App.css'

function App() {
  const [isStarted, setIsStarted] = useState(false)
  const [questionsData, setQuestionsData] = useState([])
  function start(){
    setIsStarted(true)
  }

  useEffect(() =>{
    fetch('https://opentdb.com/api.php?amount=5')
      .then(response => response.json())
      .then(data =>{
        const {results} = data
        console.log(results)
        setQuestionsData(results.map(q =>{
          return{
            ...q,
            id: nanoid(),
            correct_answer: decode(q.correct_answer),
            incorrect_answers: q.incorrect_answers.map(inAns => decode(inAns)),
            userAnswer: ''
          }
        }))
      })
  }, [])

  
  function handleClick(event, questionId){
    const userAnswer = event.target.innerText
    setQuestionsData(prevQuestionsData => {
      return prevQuestionsData.map(questionData => {
        if ((userAnswer === questionData.correct_answer || questionData.incorrect_answers.includes(userAnswer))
        &&
        questionData.id === questionId){
          return {...questionData, userAnswer: userAnswer}
        }
        return questionData
      })

    })
  }
  console.log(questionsData)
  const questions = questionsData.map( questionData => {
    const {correct_answer, incorrect_answers, question, userAnswer} = questionData
      return <Question 
        key={nanoid()}
        questionId={questionData.id}
        correctAnswer={correct_answer}
        incorrectAnswers={incorrect_answers}
        question={question}
        handleClick={handleClick}
        userAnswer={userAnswer}
      />
  })
  return(
    <main className='main'>
      {isStarted ?
      <div className='quiz'>
        {questions}
        <button className='check' onClick={end}>Check answers</button>
      </div>
      :
      <div className='welcome-page'>
        <h1 className='title'>Quizzical</h1>
        <button 
          className='start-button'
          onClick={start}
          >
          Start quiz
        </button>
      </div> 
      }
    </main>
  )
}

export default App
