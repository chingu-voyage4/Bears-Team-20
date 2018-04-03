import React from 'react';
import styled from 'styled-components';
import { deepPurple } from 'material-ui/colors';
import ChangePassword from './ChangePassword';
import ChangePicture from './ChangePicture';


const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin: 5vh 20vh;
`;

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;


const Title = styled.div`
  color: ${deepPurple[900]};
  font-size: 2em;
  margin-bottom: 1em;
`;

function Profile() {
  return (
    <ProfileContainer>
      <Title>Profile settings</Title>
      <SettingsContainer>
        <ChangePassword />
        <ChangePicture />
      </SettingsContainer>
    </ProfileContainer>
  );
}

export default Profile;
