import React from 'react';
import { connect } from 'react-redux';
import { Typography, TextField, Button } from 'material-ui';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { deepPurple } from 'material-ui/colors';

import * as actions from '../../../actions/user';

const ChangePasswordContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const FormContainer = styled.div`
  min-width: 120px;
  display: flex;
  flex-direction: column;
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

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.isFetching === false &&
      this.props.isFetching === true &&
      nextProps.errors.length === 0
    ) {
      this.setState({
        currentPassword: '',
        nextPassword: '',
        repeatPassword: '',
      });
    }
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
    const { errors } = this.props;
    return (
      <ChangePasswordContainer>

        <Title>Change password</Title>

        <FormContainer>

          <StyledTextField
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
          <StyledTextField
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

          <StyledTextField
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

          { errors.length !== 0 &&
            errors.map(error => (
              <Typography key={error.type} color="error">
                {error.message}
              </Typography>
            ))
          }

          <StyledButton
            disabled={this.props.isFetching}
            color="primary"
            onClick={this.handleChangePassword}
          >
            Change it!
          </StyledButton>

        </FormContainer>
      </ChangePasswordContainer>
    );
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
