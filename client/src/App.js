import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
	return {
    // Write here the state properties you want to map to props
    // For example:
		// auth: state.auth,
	}
}


const mapDispatchToProps = (dispatch) => {
	return {
    // Write here the dispatch(ACTION) you want to map to props
    // For example: 
    // login: (url, params) => dispatch(loginAction(url, params))
	};
};


export default connect( mapStateToProps , mapDispatchToProps)(App);