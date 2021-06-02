//Action type
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_ANSWER_USERS = 'ADD_ANSWER_USERS';

//Action Creatore
export function receiveUsers (users){
    return{
        type: RECEIVE_USERS,
        users
    }
} 

export function addAnswerUsers(users){
    return{
        type: ADD_ANSWER_USERS,
        users,
    }
}