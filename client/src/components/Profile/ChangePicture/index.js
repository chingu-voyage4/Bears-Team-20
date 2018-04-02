/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { Typography, Button, Avatar, Input } from 'material-ui';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { deepPurple } from 'material-ui/colors';
import * as actions from '../../../actions/user';



const ChangePictureContainer = styled.div`
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

const StyledAvatar = styled(Avatar)`
  margin: 0.5em 0;
  width: 100px !important;
  height: 100px !important;
  box-shadow: 1px 1px 5px 1px rgba(0,0,0,0.75);
`

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  margin-top: 1em !important;
`;

const ErrorContainer = styled.div`
`;


class ChangePictureComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      url: props.profilePic,
    };

    this.handleUploadPicture = this.handleUploadPicture.bind(this);
    this.handleInnerLocalChange = this.handleInnerLocalChange.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  handleEditClick() {
    this.setState({ editing: true });
  }

  handleInnerLocalChange(newUrl) {
    this.setState({ url: newUrl });
  }

  handleUploadPicture() {
    const { changePicture } = this.props;
    this.setState({ editing: false });
    changePicture(this.state.url);
  }

  render() {
    const { username, profilePic, errors } = this.props;
    return (
      <ChangePictureContainer>

        <Title>Profile picture</Title>

        <FormContainer>

          <AvatarContainer>
            <StyledAvatar
            alt={username}
            src={profilePic}
            />
          </AvatarContainer>

          <Input
            disabled={!this.state.editing}
            value={this.state.url}
            onChange={e => this.handleInnerLocalChange(e.target.value)}
          />

          <ButtonsContainer>
            <StyledButton
              disabled={this.state.editing}
              color="primary"
              onClick={this.handleEditClick}
            >
              Modify url
            </StyledButton>
            <StyledButton
              disabled={!this.state.editing}
              color="primary"
              onClick={this.handleUploadPicture}
            >
              Confirm changes!
            </StyledButton>
          </ButtonsContainer>

          <ErrorContainer>
            { errors.length !== 0 &&
              errors.map(error => (
                <Typography key={error.type} color="error">
                  {error.message}
                </Typography>
              ))
            }
          </ErrorContainer>
        </FormContainer>
      </ChangePictureContainer>
    );
  }
}



ChangePictureComponent.propTypes = {
  username: PropTypes.string,
  profilePic: PropTypes.string,
  errors: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  changePicture: PropTypes.func,
};

ChangePictureComponent.defaultProps = {
  username: '',
  profilePic: '',
  errors: [],
  changePicture: () => {},
};


const mapStateToProps = ({ user }) => ({
  profilePic: user.picture.url,
  errors: user.picture.errors,
  username: user.username,
});

const mapDispatchToProps = dispatch => ({
  changePicture: (url) => {
    dispatch(actions.changePictureRequest(url));
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(ChangePictureComponent);
