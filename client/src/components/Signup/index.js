import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { TextField, Button, Typography } from 'material-ui';
import * as actions from '../../actions/signup';
import './Signup.css';


export class SignupComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      redirectLogin: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleBackToLogin = this.handleBackToLogin.bind(this);
  }


  handleInputChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  }

  handleLoginClick() {
    const { signupRequest } = this.props;
    const { email, password, username } = this.state;
    signupRequest({
      username,
      email,
      password,
    });
  }

  handleBackToLogin() {
    this.setState({
      redirectLogin: true,
    });
  }

  render() {
    const { errors, isAuthenticated } = this.props;
    const { redirectLogin } = this.state;
    if (errors.length) console.log(errors);

    if (isAuthenticated) return <Redirect to="/" />;
    if (redirectLogin) return <Redirect to="/login" />;

    return (
      <div id="signup-container">
        <div id="signup-form-container">
          <Typography align="center" id="signup-logo">
                    App logo here
          </Typography>

          <Button
            className="signup-form-field"
            id="signup-redirect-login-button"
            disabled={this.props.isFetching}
            color="primary"
            onClick={this.handleBackToLogin}
          >
          Back to login
          </Button>

          <TextField
            className="signup-form-field"
            id="signup-textfield-username"
            type="username"
            name="username"
            autoFocus
            value={this.state.username}
            onChange={this.handleInputChange}
            onKeyDown={(e) => {
            // Allow "Enter" to submit
            if (e.keyCode === 13) this.handleLoginClick();
          }}
            placeholder="Username"
            InputLabelProps={{
                    required: true,
                }}
          />

          <TextField
            className="signup-form-field"
            id="signup-textfield-email"
            type="email"
            name="email"
            autoFocus
            value={this.state.email}
            onChange={this.handleInputChange}
            onKeyDown={(e) => {
            // Allow "Enter" to submit
            if (e.keyCode === 13) this.handleLoginClick();
          }}
            placeholder="Email"
            InputLabelProps={{
                    required: true,
                }}
          />

          <TextField
            className="signup-form-field"
            id="signup-textfield-password"
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
            onKeyDown={(e) => {
            // Allow "Enter" to submit
            if (e.keyCode === 13) this.handleLoginClick();
          }}
            placeholder="Password"
            InputLabelProps={{
                    required: true,
                }}
          />

          <Button
            className="signup-form-field"
            id="signup-button"
            disabled={this.props.isFetching}
            color="primary"
            onClick={this.handleLoginClick}
          >
          Signup
          </Button>

        </div>
      </div>);
  }
}


SignupComponent.propTypes = {
  isAuthenticated: PropTypes.bool,
  isFetching: PropTypes.bool,
  errors: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  signupRequest: PropTypes.func,
};

SignupComponent.defaultProps = {
  isAuthenticated: false,
  isFetching: false,
  errors: [],
  signupRequest: () => {},
};

const mapStateToProps = ({ signup, user }) => ({
  isAuthenticated: user.isAuthenticated,
  errors: signup.errors,
  isFetching: signup.isFetching,
});

const mapDispatchToProps = dispatch => ({
  signupRequest: (signupData) => {
    // Front Validation
    const newErrors = [];
    const { email, password, username } = signupData;
    if (!email || email.length < 2) {
      newErrors.push({ type: 'email', message: 'min 2' });
    }
    if (!username || username.length < 2) {
      newErrors.push({ type: 'username', message: 'min 2' });
    }
    if (!password || password.length < 2) {
      newErrors.push({ type: 'password', message: 'min 2' });
    }
    if (!newErrors.length) {
      dispatch(actions.signupRequest(signupData));
    } else {
      dispatch(actions.signupFailed(newErrors));
    }
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(SignupComponent);

