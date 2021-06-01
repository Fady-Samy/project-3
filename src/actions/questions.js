import {_getQuestions as getQuestions} from '../utils/_DATA'
//Action type
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';

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