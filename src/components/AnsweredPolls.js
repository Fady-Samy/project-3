import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux'

class AnsweredPolls extends Component {
    render() {
        const {userAnsweredQuestions,questions,users,UnAnsQuest} = this.props
        const questionList = userAnsweredQuestions ? userAnsweredQuestions : UnAnsQuest
        return (
            <Fragment>
                {questionList.map( (questId) =>(
                    <div className="pollCard">
                        <div className="title">
                           <h3> { users[questions[questId].author].name } asks </h3>
                        </div>
                        <div className="pollContent">
                            {<img src={users[questions[questId].author].avatarURL}></img>}
                            <div className="pollDetails">
                                <h3>Would You Rather</h3>
                                <p>...{[questions[questId].optionOne.text]}...</p>
                                <button className="viewBtn">View Poll</button>
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
        console.log(UnAnsQuest);
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

export default connect(mapStateToProps)(AnsweredPolls);