import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Login from './components/Login';
import Signup from './components/Signup';
import LandingPage from './components/Landing';
import Music from './components/Music';
import Profile from './components/Profile';
import Playlist from './components/Playlist';
import Navbar from './components/Navbar';

import logo from './logo.svg';
import './App.css';


// non-default export of component required due to redux testing problem.
// Problem: testing the default exported component fails due to undefined store
// Solution: testing the actual component and not the Connect component exported(default)

// Had to rename App to AppComponent cuz the linter didnt like to have the
// default export called the same as an export.
// It was either rename component or disable linter when using the default export
export const AppComponent = () => (
  <div className="App">
    <Navbar />
    <React.Fragment>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
      </p>
      <div>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/playlists" component={Playlist} />
          <Route exact path="/music" component={Music} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/landing" component={LandingPage} />
        </Switch>
      </div>
    </React.Fragment>
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


export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
