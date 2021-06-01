import React, { Component,Fragment } from 'react';
import Polls from './AnsweredPolls'
import Nav from './Nav'
import LeaderBoard from './LeaderBoard'
import {connect} from 'react-redux'

class Home extends Component {
    state ={
        choosed:"answered"
    }

    handleChange = (e) =>{
        console.log(e.target.value)
        this.setState({
            choosed :e.target.value,
          })
        }
    render() {
        return (
            <Fragment>
                <Nav/>
                <div className="question-container">
                    <div className="choosePolls">
                        <button onClick={this.handleChange} value="unanswered">Unanswered Questions</button>
                        <button  onClick={this.handleChange} value="answered">Answered Questions</button>
                    </div>
                    <Polls choosed={this.state.choosed}/>
                </div>
            </Fragment>
            
            
        );
    }
}

export default connect()(Home);