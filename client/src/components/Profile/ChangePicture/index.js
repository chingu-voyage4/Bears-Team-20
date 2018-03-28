import React from 'react';
import { connect } from 'react-redux';
import { Typography, Button, Avatar } from 'material-ui';
import PropTypes from 'prop-types';


class ChangePictureComponent extends React.Component {
  constructor(props) {
    super(props);

    this.handleUploadPicture = this.handleUploadPicture.bind(this);
  }

  handleUploadPicture() {
    const { changePicture } = this.props;
    changePicture();
  }

  render() {
    const { username, profilePic } = this.props;
    return (
      <div id="change-pic-container">
        <Typography>
                    Profile picture
        </Typography>

        <div id="change-pic-content-container">

          <div id="change-pic-avatar-container">
            <Avatar
              alt={username}
              src={profilePic}
              className="avatar big-avatar"
            />
          </div>

          <div id="change-pic-controls-container">
            <Button
              id="change-pic-button"
                        /* disabled={this.props.isFetching} */
              color="primary"
              onClick={this.handleUploadPicture}
            >
                        Upload new picture
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
