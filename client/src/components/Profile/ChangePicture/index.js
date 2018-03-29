import React from 'react';
import { connect } from 'react-redux';
import { Typography, Button, Avatar, Input } from 'material-ui';
import PropTypes from 'prop-types';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import './ChangePicture.css';

class ChangePictureComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: props.profilePic
    }

    this.handleUploadPicture = this.handleUploadPicture.bind(this);
    this.handleInnerLocalChange = this.handleInnerLocalChange.bind(this);
  }

  handleInnerLocalChange(newUrl) {
    console.log("NEW URL", newUrl);
    this.setState({ url: newUrl });
  }

  handleUploadPicture() {
    const { changePicture } = this.props;
    //changePicture();
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div id='change-pic-modal-container'>
            <Typography
            id="change-pic-modal-title"
            variant="title"
            color="primary"
            >
              Enter new picture's url
            </Typography>
            <Input
            value={this.state.url}
            onChange={ (e) => this.handleInnerLocalChange(e.target.value) }
            />
            <div id="change-pic-modal-buttons-container">
              <Button onClick={onClose}>Cancel</Button>
              <Button
              color="primary"
              onClick={() => {
                onClose()
              }}
              >
                Change it!
              </Button>
            </div>
          </div>
            
        )
      }
    })
  }

  render() {
    const { username, profilePic } = this.props;
    return (
      <div id="change-pic-container">

        <Typography
        id="change-pic-title"
        variant="title"
        color="primary"
        >
          <strong>Profile picture</strong>
        </Typography>

        <div id="change-pic-content-container">

          <div id="change-pic-avatar-container">
            <Avatar
              alt={username}
              src={profilePic}
            />
          </div>

          <div id="change-pic-controls-container">
            <Button
              id="change-pic-button"
                        /* disabled={this.props.isFetching} */
              color="primary"
              onClick={this.handleUploadPicture}
            >
              Change picture
            </Button>

            <Typography>
              You can also drag and drop a picture from your computer
            </Typography>
          </div>
        </div>
      </div>
    );
  }
}


ChangePictureComponent.propTypes = {
  username: PropTypes.string,
  profilePic: PropTypes.string,
  changePicture: PropTypes.func,
};

ChangePictureComponent.defaultProps = {
  username: '',
  profilePic: '',
  changePicture: () => {},
};


const mapStateToProps = ({ user }) => ({
  profilePic: user.profilePic,
  username: user.username,
});

const mapDispatchToProps = () => ({
  changePicture: (url) => {
    console.log('CHANGING to', url);
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(ChangePictureComponent);
