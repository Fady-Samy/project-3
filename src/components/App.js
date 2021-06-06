import React, { Component, Fragment} from 'react';
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/shared'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Login from './Login'
import Home from './Home'
import LeaderBoard from './LeaderBoard';
import NewQuestion from './NewQuestion';
import QuestionPage from './QuestionPage';
import Signup from './Signup';
import PageError from './PageError';

class App extends Component {

  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <div> {
          this.props.authedUser!==null ?
          <Fragment>
            <Route path='/' exact component={Login}/>
            <Route path='/home' component={Home}/>
            <Route path='/leaderboard' component={LeaderBoard}/>
            <Route path='/add' component={NewQuestion}/>
            <Route path='/question/:id' component={QuestionPage}/>
            <Route path='/pageerror' component={PageError}/>
          </Fragment>
          : 
          <Switch>
            <Route path='/signup' component={Signup}/>
            <Route path='/*'component={Login}/>
          </Switch>
         
          }
        </div>
      </Router>
      
    );
  }
}

function mapStateToProps({authedUser},props){
  const path = window.location.pathname
  return{
    authedUser,
    path
  }
}

export default connect(mapStateToProps)(App);