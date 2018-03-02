import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TextField, Button, Typography } from 'material-ui';
import * as actions from '../../actions/login';
import './Login.css';


export class LoginComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
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

  render() {
    return (
      <div id="login-container">
        <div id="login-form-container">
          <Typography align="center" id="login-logo">
                      App logo here
          </Typography>
          <TextField
            className="login-form-field"
            id="login-textfield-email"
            type="email"
            name="email"
            autoFocus
            value={this.state.email}
            onChange={this.handleInputChange}
            onKeyDown={(e) => { if (e.keyCode === 13) this.handleLoginClick(); }}
            placeholder="Email"
            InputLabelProps={{ required: true }}
          />
          <TextField
            className="login-form-field"
            id="login-textfield-password"
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
            onKeyDown={(e) => { if (e.keyCode === 13) this.handleLoginClick(); }}
            placeholder="Password"
            InputLabelProps={{ required: true }}
          />
          <Button
            className="login-form-field"
            id="login-button"
            disabled={this.props.isFetching}
            color="primary"
            onClick={this.handleLoginClick}
          >
                  Login
          </Button>
        </div>
      </div>);
  }
}

const mapStateToProps = ({ login }) => ({
  errors: login.errors,
  isFetching: login.isFetching,
  pause: login.pause,
});


const mapDispatchToProps = dispatch => ({
  // inputChange: (change) => dispatch(actions.loginInputChange(change)),
  loginRequest: (loginData) => {
    // Front Validation
    const newErrors = {};
    let hasErrors = false;
    const { email, password } = loginData;
    if (!email || email.length < 2) {
      newErrors.email = 'min 2';
      hasErrors = true;
    }
    if (!password || password.length < 2) {
      newErrors.password = 'min 2';
      hasErrors = true;
    }
    if (!hasErrors) {
      dispatch(actions.loginRequest(loginData));
    } else {
      dispatch(actions.loginFailed(newErrors));
    }
  },
});

LoginComponent.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  loginRequest: PropTypes.func.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
