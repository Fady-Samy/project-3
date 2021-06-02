import React, { Component, Fragment} from 'react';
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/shared'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Login from './Login'
import Home from './Home'
import LeaderBoard from './LeaderBoard';
import NewQuestion from './NewQuestion';
import QuestionPage from './QuestionPage';

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
            <Route path='/new' component={NewQuestion}/>
            <Route path='/question/:id' component={QuestionPage}/>
          </Fragment>
          : <Route path='/' exact component={Login}/>
          }
        </div>
      </Router>
      
    );
  }
}

function mapStateToProps({authedUser}){
  return{
    authedUser
  }
}

export default connect(mapStateToProps)(App);