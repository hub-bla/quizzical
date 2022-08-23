import { useEffect, useState } from 'react'
import {nanoid} from 'nanoid'
import {decode} from 'html-entities'
import Question from './components/Question'
import './App.css'

function App() {
  const [isStarted, setIsStarted] = useState(false)
  const [questionsData, setQuestionsData] = useState([])
  const [isOver, setIsOver] = useState(false)
  const [counter, setCounter] = useState(0)
  const [toggle, setToggle] = useState(false)

  function start(){
    setCounter(0)
    setIsStarted(true)
    setIsOver(false)
    setToggle(!toggle)
  }

  
  function end(){
    setIsOver(true)
    const correct = questionsData.filter(questionData =>{
      const {isCorrect} = questionData
      console.log(isCorrect)
      if (isCorrect){
        return isCorrect
      }
    })
    setCounter(correct.length)
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
            userAnswer: '',
            isCorrect: false,
            answers: shuffle([q.correct_answer, ...q.incorrect_answers])
          }
        }))
      })
  }, [toggle])

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }
  
  function handleClick(event, questionId){
    const userAnswer = event.target.innerText
    setQuestionsData(prevQuestionsData => {
      return prevQuestionsData.map(questionData => {
        if(questionData.id === questionId){
          if(userAnswer === questionData.correct_answer){
            return {...questionData, userAnswer: userAnswer, isCorrect: true}
        }else if (questionData.incorrect_answers.includes(userAnswer)){
          return {...questionData, userAnswer: userAnswer, isCorrect:false}
        }
      }
        return questionData
      })

    })
  }
    

  console.log(questionsData)
  const questions = questionsData.map( questionData => {
    const {correct_answer, incorrect_answers, question, userAnswer, answers} = questionData
      return <Question 
        key={nanoid()}
        questionId={questionData.id}
        correctAnswer={correct_answer}
        question={question}
        handleClick={handleClick}
        userAnswer={userAnswer}
        isOver={isOver}
        answersData={answers}
      />
  })
  return(
    <main className='main'>
      {isStarted ?
      <div className='quiz'>
        {questions}
        {!isOver ? 
        <button className='check' onClick={end}>Check answer</button>
         :
         <div className='summary'>
            <div className='score'>You scored {counter} of 5</div>
            <button className='check' onClick={start}>Play again</button>
         </div>
        }
        
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
