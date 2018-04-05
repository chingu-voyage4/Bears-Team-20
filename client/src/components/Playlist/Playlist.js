/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Checkbox, IconButton } from 'material-ui';
import { Delete, PlayArrow } from 'material-ui-icons';
import { FormControlLabel } from 'material-ui/Form';
import { deepPurple } from 'material-ui/colors';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import SongItem from './SongItem';

const grid = 8;

const Container = styled.div`
  background-color: ${({ isDraggingOver }) => (isDraggingOver ? deepPurple[300] : deepPurple[200])};
  display: flex;
  flex-direction: column;
  padding: ${grid}px;
  padding-bottom: 0;
  user-select: none;
  transition: background-color 0.1s ease;
  &:focus {
    outline: 2px solid ${deepPurple[500]};
    outline-offset: 2px;
  }
`;


const PlaylistHead = styled.div`
  display: flex;
  flex-direction: row;
`;

const Title = styled.div`
  color: ${deepPurple[900]};
  font-size: 1.5em;
  flex: 1;
`;

const IconButtonContainer = styled.div`
  display: flex;
  flex-direction: row ;
  flex: 1;
  justify-content: center;
`;

export default function Playlist(props) {
  const { playlist, togglePublic } = props;
  return (
    <Droppable
      droppableId={playlist._id}
      type={playlist._id}
      key={playlist._id}
    >
      {(dropProvided, dropSnapshot) => (
        <Container
          innerRef={dropProvided.innerRef}
          isDraggingOver={dropSnapshot.isDraggingOver}
          {...dropProvided.droppableProps}
        >
          <PlaylistHead>
            <Title>{playlist.name}</Title>
            <IconButton>
              <Delete />
            </IconButton>
          </PlaylistHead>

          <IconButtonContainer>
            <IconButton>
              <PlayArrow />
            </IconButton>
          </IconButtonContainer>

          <FormControlLabel
            control={
              <Checkbox
                checked={playlist.public}
                onChange={togglePublic}
                value="checkedB"
                color="primary"
              />
            }
            label="Public"
          />
          {playlist.songs.map((song, index) => (
            <Draggable
              key={song._id}
              draggableId={song._id}
              type={playlist._id}
              index={index}
            >
              {(provided, snapshot) => (
                <div>
                  <SongItem
                    song={song}
                    isDragging={snapshot.isDragging}
                    provided={provided}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Draggable>
          ))}
        </Container>
      )}
    </Droppable>
  );
}


Playlist.propTypes = {
  playlist: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  togglePublic: PropTypes.func,
};

Playlist.defaultProps = {
  playlist: {},
  togglePublic: () => {},
};
