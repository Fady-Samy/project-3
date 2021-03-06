import React, { Component } from 'react';
import { NavLink, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {setAuthedUser} from '../actions/authedUser'


class Nav extends Component{
    
    signOut = () =>{
        this.props.dispatch(setAuthedUser(null));
    }

    render(){
        
        return (
            <nav className='nav'>
                <div>
                    <ul>
                        <li>
                            <NavLink to='/home' exact className="navLink">
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/add' className="navLink">
                                New Question
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/leaderboard' className="navLink">
                                Leader Board
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul>
                    <li>
                            <span>Hello, {this.props.loggedUser}</span>
                            <img src={this.props.avatar} alt="avatar"></img>
                        </li>
                        <li>
                            <Link to='/' onClick={this.signOut}> Signout </Link>  
                        </li>
                    </ul>
                </div>
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