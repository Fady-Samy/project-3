import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {setAuthedUser} from '../actions/authedUser'
import {handleQuestions} from '../actions/questions'

class Login extends Component {
    state={
        userSelected:null,
        path:''
    }

    componentDidMount(){
        this.props.dispatch(handleQuestions())
    }

    handleChoosed = () =>{
        const choosed = document.getElementById('userSelected').value;
        this.setState({
            userSelected: choosed
        })
        if(choosed!==undefined && this.props.toPath==='/'){
            this.setState({path:'/home'})
        }else if(choosed!==undefined && this.props.toPath!=='/'){
            this.setState({path:this.props.toPath})
        }
        
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
        const {userSelected,path} = this.state
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
                    <Link to={userSelected===null ? '/' : `${path}`} className='btn' onClick={this.handleLogin}>Sign In</Link>
                    <span>Need account?</span>
                    <Link to='/signup'>Sign up</Link>
                </form>
            </div>
        );
    }
}

//Getting the users from the state
function mapStateToProps({users,authedUser}){
    const toPath = window.location.pathname
    return{
        usersId: Object.keys(users),
        users,
        authedUser,
        toPath
    }
}

export default connect(mapStateToProps)(Login);