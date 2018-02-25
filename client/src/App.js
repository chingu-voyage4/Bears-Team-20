import React from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';

const App = () => (
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

// Maps the state or parts of it to props
// Disabled linter next line because of the unused variable rule.
// eslint-disable-next-line
const mapStateToProps = state => ({
  // Write here the state properties you want to map to props
  // For example:
  // auth: state.auth,
});


// Maps dispatch(Actions) to props
// Disabled linter next line because of the unused variable rule.
// eslint-disable-next-line
const mapDispatchToProps = dispatch => ({
  // Write here the dispatch(ACTION) you want to map to props
  // For example:
  // login: (url, params) => dispatch(loginAction(url, params))
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
