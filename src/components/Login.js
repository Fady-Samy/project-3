import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {setAuthedUser} from '../actions/authedUser'
import {handleQuestions} from '../actions/questions'

class Login extends Component {
    state={
        userSelected:null
    }
    componentDidMount(){
        this.props.dispatch(handleQuestions())
    }

    handleChoosed = () =>{
        const choosed = document.getElementById('userSelected').value;
        this.setState({
            userSelected: choosed
        })
    }

    handleLogin = ()=>{
        const choosed = document.getElementById('userSelected').value;
        let id=''
        for( let i=0; i<this.props.usersId.length;i++){
            let nameId= this.props.usersId[i]
            if(this.props.users[nameId].name === choosed){
                id = this.props.users[nameId].id
                break
            }
        }
        this.props.dispatch(setAuthedUser(id))
    }

    render() {
        const {userSelected} = this.state
        return (
            <div className='loginContainer'>
                <h3>Welcome! Please Sign in</h3>
                <form className='loginForm'>
                    <select id="userSelected" defaultValue={"select"} onChange={this.handleChoosed}>
                        <option disabled value="select"> -- select user -- </option>
                        {this.props.usersId.map((id)=>(
                            <option key={id}>
                                {this.props.users[id].name}
                            </option>
                        ))}
                    </select>
                    <Link to={userSelected!==null ? "/home" : '/'} className='btn' onClick={this.handleLogin}>Sign In</Link>
                </form>
            </div>
        );
    }
}

//Getting the users from the state
function mapStateToProps({users,authedUser}){
    return{
        usersId: Object.keys(users),
        users,
        authedUser
    }
}

export default connect(mapStateToProps)(Login);