import React from 'react';
import ChangePassword from './ChangePassword';
import ChangePicture from './ChangePicture';

import './Profile.css';

function ProfileContainer() {
  return (
    <div id="profile-container">
      <ChangePassword />
      <ChangePicture />
    </div>
  );
}

export default ProfileContainer;
