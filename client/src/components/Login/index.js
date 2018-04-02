import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TextField, Button } from 'material-ui';
import styled from 'styled-components';
import { deepPurple } from 'material-ui/colors';

import * as actions from '../../actions/login';


const LoginContainer = styled.div`
  margin-top: 10vh;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const FormContainer = styled.div`
  min-width: 120px;
  max-width: 50%;
  display: flex;
  flex-direction: column;
`;

const Logo = styled.div`
  color: ${deepPurple[900]};
  user-select: none;
  font-size: 3em;
  padding: 0 0.2em;
  font-family: 'Pacifico', sans-serif;

  margin-bottom: 5vh;
`;

const Title = styled.div`
  color: ${deepPurple[900]};
  font-size: 1.5em;
  margin-bottom: 1em;
`;

const StyledTextField = styled(TextField)`
  text-align: center;
  padding-bottom: 3px !important;
`;

const StyledButton = styled(Button)`
  margin-top: 1em !important;
`;


export class LoginComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      redirectSignup: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    this.handleLocalSignup = this.handleLocalSignup.bind(this);
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
    const { loginRequest } = this.props;
    const { email, password } = this.state;
    loginRequest({
      email,
      password,
    });
  }

  handleGoogleLogin() {
    const { isAuthenticated } = this.props; // eslint-disable-line no-unused-vars
    window.location.href = '/api/auth/google';
  }

  handleLocalSignup() {
    this.setState({
      redirectSignup: true,
    });
  }

  render() {
    const { errors, isAuthenticated } = this.props;
    const { redirectSignup } = this.state;
    if (errors.length) console.log(errors);

    if (isAuthenticated) return <Redirect to="/" />;
    if (redirectSignup) return <Redirect to="/signup" />;

    return (
      <LoginContainer>

        <Logo>MusicHub</Logo>

        <Title>Login!</Title>

        <FormContainer>
          <StyledTextField
            className="login-form-field"
            id="login-textfield-email"
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

          <StyledTextField
            className="login-form-field"
            id="login-textfield-password"
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

          <StyledButton
            className="login-form-field"
            id="login-button"
            disabled={this.props.isFetching}
            color="primary"
            onClick={this.handleLoginClick}
          >
                Login
          </StyledButton>

        </FormContainer>

        <StyledButton
          id="login-google-button"
          disabled={this.props.isFetching}
          color="primary"
          onClick={this.handleLocalSignup}
        >
          Signup locally
        </StyledButton>

        <StyledButton
          id="login-google-button"
          disabled={this.props.isFetching}
          color="primary"
          onClick={this.handleGoogleLogin}
        >
          Login with google
        </StyledButton>
      </LoginContainer>
    );
  }
}

LoginComponent.propTypes = {
  isAuthenticated: PropTypes.bool,
  isFetching: PropTypes.bool,
  errors: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  loginRequest: PropTypes.func,
};

LoginComponent.defaultProps = {
  isAuthenticated: false,
  isFetching: false,
  errors: [],
  loginRequest: () => {},
};

const mapStateToProps = ({ login, user }) => ({
  isAuthenticated: user.isAuthenticated,
  errors: login.errors,
  isFetching: login.isFetching,
  pause: login.pause,
});


const mapDispatchToProps = dispatch => ({
  // inputChange: (change) => dispatch(actions.loginInputChange(change)),
  loginRequest: (loginData) => {
    // Front Validation
    const newErrors = [];
    const { email, password } = loginData;
    if (!email || email.length < 2) {
      newErrors.push({ type: 'email', message: 'min 2' });
    }
    if (!password || password.length < 2) {
      newErrors.push({ type: 'password', message: 'min 2' });
    }
    if (!newErrors.length) {
      dispatch(actions.loginRequest(loginData));
    } else {
      dispatch(actions.loginFailed(newErrors));
    }
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
