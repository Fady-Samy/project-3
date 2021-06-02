import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class Polls extends Component {

    toPoll = (e,questId)=>{
        e.preventDefault()
       this.props.history.push(`/question/${questId}`)
    }
    render() {
        const {userAnsweredQuestions,questions,users,UnAnsQuest} = this.props
        const questionList = userAnsweredQuestions ? userAnsweredQuestions : UnAnsQuest
        return (
            <Fragment>
                {questionList.map( (questId) =>(
                    <div className="pollCard" key={questId}>
                        <div className="title">
                           <h3> { users[questions[questId].author].name } asks </h3>
                        </div>
                        <div className="pollContent">
                            {<img src={users[questions[questId].author].avatarURL} alt="avatar"></img>}
                            <div className="pollDetails">
                                <h3>Would You Rather</h3>
                                <p>...{[questions[questId].optionOne.text]}...</p>
                                <button className="viewBtn" onClick={(e) => this.toPoll(e, questId)} >View Poll</button>
                            </div>
                        </div>
                    </div>
                ))}
            </Fragment>
        );
    }
}
function mapStateToProps({questions,users,authedUser},{choosed}){
    if(choosed ==="unanswered"){
        const userAnsweredQuestions= Object.keys(users[authedUser].answers)
        let UnAnsQuest = Object.keys(questions).filter(questId=> !userAnsweredQuestions.includes(questId))
        return{
            UnAnsQuest,
            questions,
            users,
        }
    }else{
        return{
            userAnsweredQuestions: Object.keys(users[authedUser].answers),
            questions,
            users,
        }
    }
}

export default withRouter(connect(mapStateToProps)(Polls));