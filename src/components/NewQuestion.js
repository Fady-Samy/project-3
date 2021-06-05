import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux'
import { handleAddQuestion } from '../actions/questions';
import {Redirect} from 'react-router-dom'
import Nav from './Nav';

class NewQuestion extends Component {
    state ={
        optionOne: '',
        optionTwo: '',
        toHome: false
    }

    handleOptionOne = (e) =>{
        this.setState({
            optionOne: e.target.value,
        })
    }

    handleOptionTwo = (e) =>{
        this.setState({
            optionTwo: e.target.value,
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        const {optionOne,optionTwo} = this.state
        const {dispatch} =this.props
        if(optionTwo!==''||optionTwo!==''){
            dispatch(handleAddQuestion(optionOne,optionTwo))
            this.setState(() => ({
                optionOne: '',
                optionTwo: '',
                 toHome:true
             }))
        }
        
    }
    render() {
        const {optionOne,optionTwo,toHome} = this.state

        if(toHome === true){
            return <Redirect to='/home'/>
        }

        return (
            <Fragment>
                <Nav/>
                <div className="newquest-card">
                    <div className="card-title">
                        <h2>Cretae New Question</h2>
                    </div>
                    <div className="question">
                        <h4>Would you rather...</h4>
                        <input id="optionone" type="text" value={optionOne} onChange={this.handleOptionOne} placeholder=" Enter Option One Here"/>
                        <p id="or">OR</p>
                        <input id="optiontwo" type="text" value={optionTwo} onChange={this.handleOptionTwo} placeholder=" Enter Option Two Here"/>
                    </div>
                    <button type="submit" onClick={this.handleSubmit} className="viewBtn">Submit</button>
                </div>
            </Fragment>
           
        );
    }
}

export default connect()(NewQuestion);