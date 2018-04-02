import React from 'react';
import styled from 'styled-components';
import { deepPurple } from 'material-ui/colors';


const PlaylistContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const Title = styled.div`
  color: ${deepPurple[900]};
  font-size: 2em;
  margin: 1em 0;
`;

const Playlist = () => (
  <PlaylistContainer>
    <Title>Playlist management</Title>
  </PlaylistContainer>
);

export default Playlist;
