import React, { Component } from 'react';
import { NavLink,Redirect, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {setAuthedUser} from '../actions/authedUser'


class Nav extends Component{
    state={
        loggedUser: this.props.loggedUser
    }
    signOut = () =>{
        this.props.dispatch(setAuthedUser(null));
        this.setState({
            loggedUser:null
        })
    }

    render(){
        if(this.state.loggedUser ===null ){
            return <Redirect to='/'/>
        }
        return (
            <nav className='nav'>
                <ul>
                    <li>
                        <NavLink to='/home' exact className="navLink">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/new' className="navLink">
                            New Question
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/leaderboard' className="navLink">
                            Leader Board
                        </NavLink>
                    </li>
                    <li>
                        <span>Hello, {this.props.loggedUser}</span>
                        <img src={this.props.avatar} alt="avatar"></img>
                    </li>
                    <li>
                        <Link to='/' onClick={this.signOut}> Signout </Link>  
                    </li>
                </ul>
            </nav>
            );
    }
    
}

function mapStateToProps({authedUser, users}){
    return{
        loggedUser: authedUser ? users[authedUser].name :null,
        avatar: authedUser ? users[authedUser].avatarURL : ""
    }
}

export default connect(mapStateToProps)(Nav);