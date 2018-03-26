import React from 'react';
import { TextField, Button } from 'material-ui';
import PropTypes from 'prop-types';


export default class ChangePassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPassword: '',
      nextPassword: '',
      repeatPassword: '',
    };

    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleChangePassword() {
    const { currentPassword, nextPassword, repeatPassword } = this.state;
    if (nextPassword === repeatPassword) {
      console.log('CHANGE PW', currentPassword, nextPassword);
    } else {
      console.log('PASSWORDS DONT MATCH');
    }
  }

  handleInputChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div id="changepw-container">
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
                Change password
          </Button>

        </div>
      </div>);
  }
}


ChangePassword.propTypes = {
  isFetching: PropTypes.bool,
};

ChangePassword.defaultProps = {
  isFetching: false,
};
