import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import {handleAddAnswer} from '../actions/questions'
import Nav from './Nav'

class QuestionPage extends Component {
    handleSubmit = (e) =>{
        e.preventDefault()
        let selected = document.querySelectorAll("input[name=answer]:checked")[0]
        let answer= selected ? selected.value : ""
        const {dispatch,id} =this.props
        if(answer){
            dispatch(handleAddAnswer(id,answer))
        }
       
    }
    render() {
        const {id,users,questions,isAnswered,answer,numUsers,choosedOne,choosedTwo} = this.props
        const onePercntage = Math.floor(choosedOne/numUsers*100)
        const twoPercntage = Math.floor(choosedTwo/numUsers*100)

        return (
            <Fragment>
                <Nav/>
                <div className="quest-card">
                    <div className="title">
                        <h3> { users[questions[id].author].name } asks </h3>
                    </div>
                    <div className="quest-info">
                        {<img src={users[questions[id].author].avatarURL} alt="avatar"></img>}
                        {!isAnswered && 
                            <div className="unanswered">
                                <h3>Would You Rather</h3>
                                <form className="question-options">
                                    <input type="radio" name="answer" value="optionOne"/>
                                    <label >{questions[id].optionOne.text}</label><br/>
                                    <input type="radio" name="answer" value="optionTwo"/>
                                    <label >{questions[id].optionTwo.text}</label><br/>
                                    <button className="viewBtn" type="submit" onClick={this.handleSubmit}> Submit</button>
                                </form>
                            </div>
                        }
                        {isAnswered && 
                            <div className="answered">
                                <h3 style={{fontWeight:"bold"}}>Results:</h3>

                                <div className={answer==="optionOne"? "selected" :""}>
                                    <p>Would you rather {questions[id].optionOne.text}</p>
                                    <div className="w3-border">
                                        <div className="w3-green" style={{width:`${onePercntage}%`}}>{onePercntage}%</div>
                                    </div>
                                    <p id="result"> {choosedOne} out of {numUsers} votes</p>
                                </div>

                                <div className={answer==="optionTwo"? "selected" :""}>
                                    <p>Would you rather {questions[id].optionTwo.text}</p>
                                    <div className="w3-border">
                                        <div className="w3-green" style={{width:`${twoPercntage}%`}}>{twoPercntage}%</div>
                                    </div>
                                    <p id="result"> {choosedTwo} out of {numUsers} votes</p>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </Fragment>
        );
    }
}

function mapStateToProps({authedUser,questions,users},props){
    const {id} = props.match.params
    const isAnswered = Object.keys(users[authedUser].answers).includes(id) ? true : false
    let answer = isAnswered ? users[authedUser].answers[id] : null
    let numUsers= Object.keys(users);
    let choosedOne=[]
    let choosedTwo=[]
    numUsers.forEach( (userId) => {
        if(Object.keys(users[userId].answers).includes(id)){
           if(users[userId].answers[id]==="optionOne"){
                choosedOne.push(users[userId].answers[id])
           }else{
                choosedTwo.push(users[userId].answers[id])
           }
        }  
    })
    return{
        id,
        users,
        questions,
        isAnswered,
        answer,
        numUsers: numUsers.length,
        choosedOne: choosedOne.length,
        choosedTwo: choosedTwo.length,
        authedUser
    }
}
export default connect(mapStateToProps)(QuestionPage);