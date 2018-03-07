import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
    const { errors } = this.props;
    if (errors.length) console.log(errors);

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

LoginComponent.propTypes = {
  isFetching: PropTypes.bool,
  errors: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  loginRequest: PropTypes.func,
};

LoginComponent.defaultProps = {
  isFetching: false,
  errors: [],
  loginRequest: () => {},
};

const mapStateToProps = ({ login }) => ({
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
