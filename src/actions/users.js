//Action type
export const RECEIVE_USERS = 'RECEIVE_USERS';

//Action Creatore
export function receiveUsers (users){
    return{
        type: RECEIVE_USERS,
        users
    }
} 
