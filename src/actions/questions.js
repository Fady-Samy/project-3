import {_getQuestions as getQuestions, 
    _saveQuestion as saveQuestion,
    _saveQuestionAnswer as saveQuestionAnswer
} from '../utils/_DATA'

import {addAnswerUsers} from '../actions/users'
//Action type
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_ANSWER_QUESTION = 'ADD_ANSWER_QUESTION';

//Action Creatore
export function receiveQuestions (questions){
    return{
        type: RECEIVE_QUESTIONS,
        questions
    }
} 

export function handleQuestions (){
    return (dispatch) => {
        return getQuestions()
        .then( (quest) => {
            dispatch(receiveQuestions(quest))
        }) 
    }
}

function addQuestion(question){
    return{
        type: ADD_QUESTION,
        question
    }
}

function addAnswerQuestion(questions){
    return{
        type: ADD_ANSWER_QUESTION,
        questions,
    }
}

export function handleAddQuestion(optionOne,optionTwo){
    return(dispatch,getState) =>{
        const {authedUser} = getState()
        return saveQuestion({
            optionOneText:optionOne,
            optionTwoText: optionTwo,
            author: authedUser
        })
        .then ( (question) => dispatch(addQuestion(question)))
        .catch ( (err) => console.log("Error here"))
    }
}

export function handleAddAnswer(id,answer){
    return(dispatch,getState) =>{
        console.log(answer)
        const {authedUser} = getState()
        return saveQuestionAnswer({
            authedUser,
            qid: id,
            answer
        })
        .then ( (response) => {
            dispatch(addAnswerQuestion(response.questions))
            dispatch(addAnswerUsers(response.users))
        })
        .catch ( (err) => console.log("Error here"))
    }
}