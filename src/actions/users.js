//Action type
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_ANSWER_USERS = 'ADD_ANSWER_USERS';
export const ADD_USER = 'ADD_USER';
export const ADD_NEW_QUEST_TO_USER = 'ADD_NEW_QUEST_TO_USER';
export const ADD_NEW_QUEST_NEW_USER = 'ADD_NEW_QUEST_NEW_USER';

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

export function addUser(id,name,avatarURL){
    return{
        type: ADD_USER,
        id,
        name,
        avatarURL
    }
}

export function addNewQuetionToUser(users){
    return{
        type: ADD_NEW_QUEST_TO_USER,
        users
    }

}

export function addNewQuestNewUser (users){
    return{
        type: ADD_NEW_QUEST_NEW_USER,
        users
    }
}