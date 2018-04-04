import React from 'react';
import styled from 'styled-components';
import { deepPurple } from 'material-ui/colors';
import List, { ListItem, ListItemText } from 'material-ui/List';

const playLists = ['Play1', 'Play2', 'Play3'];

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
    <List>
      {playLists.map(x =>
        (
          <ListItem button>
            <ListItemText primary={x} />
          </ListItem>))}
    </List>
  </PlaylistContainer>
);

export default Playlist;
