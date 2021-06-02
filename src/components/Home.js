import React, { Component,Fragment } from 'react';
import {connect} from 'react-redux'

import Polls from './Polls'
import Nav from './Nav'

class Home extends Component {
    state ={
        choosed:"unanswered"
    }

    handleChange = (e) =>{
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