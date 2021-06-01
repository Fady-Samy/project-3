import {_getUsers as getUsers} from '../utils/_DATA'

import {receiveUsers} from './users'

export function handleInitialData(){
    return(dispatch)=>{
        return getUsers()
        .then( (users) => {
            dispatch(receiveUsers(users))
        })
    }
}