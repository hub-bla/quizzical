import { useEffect, useState } from 'react';
import {nanoid} from 'nanoid'
import './styles/Question.css'

function Question(props){
    //create array with random order of answers
    //then map over that array to create html elements for them
    
    

    const answers = props.answersData.map(answer => {
        return props.isOver ?
                <p 
                key={nanoid()}
                className={`answer ${answer === props.correctAnswer ? "correct" : (props.userAnswer === answer ? "incorrect" : "other")}`}
                dangerouslySetInnerHTML={{__html: `${answer}`}} />
            :
            <p 
                key={nanoid()}
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