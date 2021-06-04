import {RECEIVE_USERS, ADD_ANSWER_USERS, ADD_USER,ADD_NEW_QUEST_TO_USER,ADD_NEW_QUEST_NEW_USER} from '../actions/users'


export default function users (state={}, action){
    switch(action.type){
        case RECEIVE_USERS:
            return{
                ...state,
                ...action.users
            }
        case ADD_ANSWER_USERS:
            return {
                ...state,
                ...action.users
            }
        case ADD_USER:
            return {
                ...state,
                [action.id]:{
                    id: action.id,
                    name:action.name,
                    avatarURL: action.avatarURL,
                    answers:{},
                    questions:[]
                }
            }
        case ADD_NEW_QUEST_TO_USER:
            return{
                ...state,
                ...action.users
            }
        case ADD_NEW_QUEST_NEW_USER:
            return{
                ...state,
                ...action.users
            }
        default:
            return state
    }
}