import { useEffect, useState } from 'react';
import {nanoid} from 'nanoid'
import './styles/Question.css'

function Question(props){
    //create array with random order of answers
    //then map over that array to create html elements for them
    const [answersData, setAnswersData] = useState([props.correctAnswer, ...props.incorrectAnswers])
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array
      }

    useEffect(() => {
        setAnswersData(prevAnswersData => shuffle(prevAnswersData))
    }, [])

    const answers = answersData.map(answer => {
        return <p 
                key={nanoid()}
                id={nanoid()}
                className={`answer ${props.userAnswer === answer ? "user-answer" : ""}`}
                onClick={() => {props.handleClick(event, props.questionId)}}
                dangerouslySetInnerHTML={{__html: `${answer}`}} />

    })
    return(
        <div className='question-data'>
            <h3 className='question' dangerouslySetInnerHTML={{__html: `${props.question}`}} />
            <div className='answers'>
                {answers}
            </div>
        </div>
    )
}

export default Question