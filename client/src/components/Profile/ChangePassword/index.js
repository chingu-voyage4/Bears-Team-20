import React from 'react';
import { connect } from 'react-redux';
import { Typography, TextField, Button } from 'material-ui';
import PropTypes from 'prop-types';
import * as actions from '../../../actions/user';

import './ChangePassword.css';

class ChangePasswordComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPassword: '',
      nextPassword: '',
      repeatPassword: '',
    };

    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleChangePassword() {
    const { currentPassword, nextPassword, repeatPassword } = this.state;
    const { changePassword } = this.props;
    changePassword(currentPassword, nextPassword, repeatPassword);
  }

  handleInputChange(event) {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div id="changepw-container">

        <Typography
        id="changepw-title"
        variant="title"
        color="primary"
        >
          <strong>Change password</strong>
        </Typography>

        <div id="changepw-form-container">

          <TextField
            className="changepw-form-field"
            id="changepw-textfield-current-pass"
            type="password"
            name="currentPassword"
            value={this.state.currentPassword}
            onChange={this.handleInputChange}
            onKeyDown={(e) => {
                // Allow "Enter" to submit
                if (e.keyCode === 13) this.handleChangePassword();
            }}
            placeholder="Current password"
            InputLabelProps={{
              required: true,
            }}
          />
          <TextField
            className="changepw-form-field"
            id="changepw-textfield-next-pass"
            type="password"
            name="nextPassword"
            value={this.state.nextPassword}
            onChange={this.handleInputChange}
            onKeyDown={(e) => {
                // Allow "Enter" to submit
                if (e.keyCode === 13) this.handleChangePassword();
            }}
            placeholder="Next password"
            InputLabelProps={{
              required: true,
            }}
          />

          <TextField
            className="changepw-form-field"
            id="changepw-textfield-repeat-pass"
            type="password"
            name="repeatPassword"
            value={this.state.repeatPassword}
            onChange={this.handleInputChange}
            onKeyDown={(e) => {
                // Allow "Enter" to submit
                if (e.keyCode === 13) this.handleChangePassword();
            }}
            placeholder="Repeat password"
            InputLabelProps={{
              required: true,
            }}
          />

          <Button
            className="changepw-form-field"
            id="changepw-button"
            disabled={this.props.isFetching}
            color="primary"
            onClick={this.handleChangePassword}
          >
            Change it!
          </Button>

        </div>
      </div>);
  }
}


ChangePasswordComponent.propTypes = {
  isFetching: PropTypes.bool,
  errors: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  changePassword: PropTypes.func,
};

ChangePasswordComponent.defaultProps = {
  isFetching: false,
  errors: [],
  changePassword: () => {},
};


const mapStateToProps = ({ user }) => ({
  isFetching: user.changePw.isFetching,
  errors: user.changePw.errors,
});

const mapDispatchToProps = dispatch => ({
  changePassword: (currentPassword, nextPassword, repeatPassword) => {
    if (nextPassword !== repeatPassword) {
      dispatch(actions.changePwFailed([
        {
          type: 'mismatch',
          message: 'Passwords dont match',
        },
      ]));
      return;
    }
    dispatch(actions.changePwRequest({
      currentPassword,
      nextPassword,
      repeatPassword,
    }));
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordComponent);
