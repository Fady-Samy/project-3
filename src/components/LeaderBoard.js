import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux'
import Nav from './Nav';

class LeaderBoard extends Component {
    render() {
        const {leaderUsers} = this.props;
        return (
            <Fragment>
                <Nav/>
                <div className="leaderCard">
                    {leaderUsers.map((user=>(
                        <div className="card-content" key={user[5]}>
                            <div className="card-img">
                                <img src={user[1]} alt=""></img>
                            </div>
                            <div className="card-info">
                                <h4>{user[0]}</h4>
                                <p>Answered questions <span>{user[2]}</span></p>
                                <p>Asked questions <span>{user[3]}</span></p>
                            </div>
                            <div className="score">
                                <h4>Score</h4>
                                <p className="scoreTag">{user[4]}</p>
                            </div>
                        </div>
                    )))}
                </div>
            </Fragment>
           
        );
    }
}

function mapStateToProps({users}){
    let leaderUsers=[]
    Object.keys(users).map( (user) =>{
        let id = users[user].id
        let name= users[user].name
        let avatar = users[user].avatarURL
        let answered = Object.keys(users[user].answers).length
        let asked = users[user].questions.length
        let score = answered + asked
        leaderUsers.push([name,avatar,answered,asked,score,id])
    })
    return{
        leaderUsers: leaderUsers.sort((a,b) => b[4]-a[4])
    }
}

export default connect(mapStateToProps)(LeaderBoard);