import {_getQuestions as getQuestions, 
    _saveQuestion as saveQuestion,
    _saveQuestionAnswer as saveQuestionAnswer,
    saveNewUserQuestionAnswer,
    saveNewUserQuestion
} from '../utils/_DATA'

import {addAnswerUsers,addNewQuetionToUser,addNewQuestNewUser} from '../actions/users'
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
        const {authedUser,users} = getState()
        const name = users[authedUser].name
        const avatarURL = users[authedUser].avatarURL
        const prevAnswers = users[authedUser].questions ? users[authedUser].answers : {}
        console.log("prevAnswers are: ", prevAnswers)
        if(Object.keys(users[authedUser].questions).length===0){
            console.log("here")
            return saveNewUserQuestion({
                optionOneText:optionOne,
                optionTwoText: optionTwo,
                author: authedUser,
                name,
                avatarURL,
                prevAnswers
            })
            .then ( (response) => {
                dispatch(addQuestion(response.question))
                dispatch(addNewQuestNewUser(response.users))
            })
            .catch ( (err) => console.log("Error here"))
        }
        return saveQuestion({
            optionOneText:optionOne,
            optionTwoText: optionTwo,
            author: authedUser
        })
        .then ( (response) => {
            dispatch(addQuestion(response.question))
            dispatch(addNewQuetionToUser(response.users))

        })
        .catch ( (err) => console.log("Error here"))
    }
}

export function handleAddAnswer(id,answer){
    return(dispatch,getState) =>{
        const {authedUser,users} = getState()
        const name = users[authedUser].name
        const avatarURL = users[authedUser].avatarURL
        const prevQuestions = users[authedUser].questions.length===0 ? [] : users[authedUser].questions
        
        if(Object.keys(users[authedUser].answers).length===0){
            return saveNewUserQuestionAnswer({
                authedUser,
                qid: id,
                answer,
                name,
                avatarURL,
                prevQuestions
            })
            .then ( (response) => {
                dispatch(addAnswerQuestion(response.questions))
                dispatch(addAnswerUsers(response.users))
                
            })
            .catch ( (err) => console.log("Error here"))
        }
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