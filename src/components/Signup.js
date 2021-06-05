import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import ImageInput from './ImageInput'
import {addUser} from '../actions/users'
import {setAuthedUser} from '../actions/authedUser'

class Signup extends Component {

    state={
        input:'',
    }
    handleInput = () =>{
        const username = document.getElementById('username').value
        this.setState({
            input: username
        })
    }

    handleSignup = ()=>{
        const {usersIds} = this.props
        const name = document.getElementById('username').value
        const avatarURL = document.getElementsByName('avatarURL')[0].value
        const id = name.toLowerCase().split(' ').join('')
        var exist = false
        usersIds.forEach((uId) =>{
            if(uId===id){
                exist= true
                alert("User name already exist, try again")
            }
        })
        
        if(this.state.input.length!==0 && exist===false){
            this.props.dispatch(addUser(id,name,avatarURL))
            this.props.dispatch(setAuthedUser(id))
        }
    }
    render() {
        const {input} = this.state
        return (
            <div className="create-user">
                <form className="create-user-form">
                    <ImageInput className="create-contact-avatar-input" name='avatarURL' maxHeight={64}/>
                    <input id="username" type="text" value={input} onChange={this.handleInput} placeholder="Enter your name"/>
                </form>
                <Link to={input!=='' ? '/home' : '/signup'} className='btn' onClick={this.handleSignup}>Sign Up</Link>
            </div>
        );
    }
}

function mapStateToProps({users}){
    let usersIds = Object.keys(users) 
    return{
        usersIds
    }
}

export default connect(mapStateToProps)(Signup);