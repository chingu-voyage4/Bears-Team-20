import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { TextField, Button } from 'material-ui';
import styled from 'styled-components';
import { deepPurple } from 'material-ui/colors';

import * as actions from '../../actions/signup';


const SignupContainer = styled.div`
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

    if (isAuthenticated) return <Redirect to="/music" />;
    if (redirectLogin) return <Redirect to="/login" />;

    return (
      <SignupContainer>
        <Logo>MusicHub</Logo>

        <Title>Sign up!</Title>

        <FormContainer>

          <StyledTextField
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

          <StyledTextField
            id="signup-textfield-email"
            type="email"
            name="email"
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

          <StyledButton

            id="signup-button"
            disabled={this.props.isFetching}
            color="primary"
            onClick={this.handleLoginClick}
          >
          Signup
          </StyledButton>

          <StyledButton
            id="signup-redirect-login-button"
            disabled={this.props.isFetching}
            color="primary"
            onClick={this.handleBackToLogin}
          >
          Already registered
          </StyledButton>

        </FormContainer>
      </SignupContainer>
    );
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

