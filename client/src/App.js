import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Login from './components/Login';
import Signup from './components/Signup';
import Landing from './components/Landing';
import Music from './components/Music';
import Profile from './components/Profile';
import Playlist from './components/Playlist';
import Navbar from './components/Navbar';

import * as userActions from './actions/user';

import './App.css';


// non-default export of component required due to redux testing problem.
// Problem: testing the default exported component fails due to undefined store
// Solution: testing the actual component and not the Connect component exported(default)

// Had to rename App to AppComponent cuz the linter didnt like to have the
// default export called the same as an export.
// It was either rename component or disable linter when using the default export
export class AppComponent extends React.Component {
  componentDidMount() {
    const { userCheckin } = this.props;
    userCheckin();
  }

  render() {
    const { user, userLogout } = this.props;

    return (
      <div className="App">
        <Navbar user={user} />
        <React.Fragment>
          <div>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/playlists" component={Playlist} />
              <Route path="/music" component={Music} />
              { user.isAuthenticated &&
              <Route path="/profile" component={Profile} />
            }
              <Route
                path="/logout"
                render={() => {
              userLogout();
              return <Redirect to="/" />;
            }}
              />
              <Route path="/" exact component={Landing} />
              <Route
                path="/*"
                render={() => <Redirect to="/" />}
              />
            </Switch>
          </div>
        </React.Fragment>
      </div>
    );
  }
}


AppComponent.propTypes = {
  user: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  userCheckin: PropTypes.func,
  userLogout: PropTypes.func,
};

AppComponent.defaultProps = {
  user: {},
  userCheckin: () => {},
  userLogout: () => {},
};

// Maps the state or parts of it to props
// Disabled linter next line because of the unused variable rule.
// eslint-disable-next-line
const mapStateToProps = state => ({
  user: state.user,
});


// Maps dispatch(Actions) to props
const mapDispatchToProps = dispatch => ({
  userCheckin: () => dispatch(userActions.userCheckin()),
  userLogout: () => dispatch(userActions.userRequestLogout()),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppComponent));
