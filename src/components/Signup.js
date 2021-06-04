import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import ImageInput from './ImageInput'
import {addUser} from '../actions/users'
import {setAuthedUser} from '../actions/authedUser'

class Signup extends Component {

    state={
        input:'',
        exist: false
    }
    handleInput = () =>{
        const username = document.getElementById('username').value
        this.setState({
            input: username
        })
    }
    verifyUsername = (id) =>{
        const {usersIds} = this.props
        let exist = false
        usersIds.map((uId) =>{
            if(uId===id){
                exist= null
                alert("User name already exist, try again")
            }
        })
        console.log(exist)
    }
    handleSignup = ()=>{
        const name = document.getElementById('username').value
        const avatarURL = document.getElementsByName('avatarURL')[0].value
        const id = name.toLowerCase().split(' ').join('')
        //this.verifyUsername(id)
        
        //console.log(this.state.exist)
        this.props.dispatch(addUser(id,name,avatarURL))
        this.props.dispatch(setAuthedUser(id))
    }
    render() {
        const {input,exist} = this.state
        return (
            <div className="create-user">
                <form className="create-user-form">
                    <ImageInput className="create-contact-avatar-input" name='avatarURL' maxHeight={64}/>
                    <input id="username" type="text" value={input} onChange={this.handleInput} placeholder="Enter your name"/>
                </form>
                <Link to={input===''|| exist===true ? "/signup" : '/home'} className='btn' onClick={this.handleSignup}>Sign Up</Link>
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