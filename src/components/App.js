import React, { Component } from 'react';

import {connect} from 'react-redux'
import {handleInitialData} from '../actions/shared'

import Login from './Login'
import Home from './Home'

import {BrowserRouter as Router, Route} from 'react-router-dom'
import LeaderBoard from './LeaderBoard';

class App extends Component {

  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <div>
          <Route path='/' exact component={Login}/>
          <Route path='/home' component={Home}/>
          <Route path='/leaderboard' component={LeaderBoard}/>
        </div>
      </Router>
      
    );
  }
}

export default connect()(App);