/* eslint-disable no-underscore-dangle */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button } from 'material-ui';
import { deepPurple } from 'material-ui/colors';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Playlist from './Playlist';


const Title = styled.div`
color: ${deepPurple[900]};
font-size: 2em;
margin: 1em 0;
display: flex;
flex-direction: row;
justify-content: center;
`;

const StyledPlaylistContainer = styled.div`
  margin: 0 5vw;
`;

const Container = styled.div`
  background-color: ${({ isDraggingOver }) => (isDraggingOver ? deepPurple[50] : deepPurple[0])};
  display: flex;
  flex-direction: row;
  padding: 8px;
  margin: 0px 4px;
  padding-bottom: 0;
  user-select: none;
  transition: background-color 0.1s ease;

  &:focus {
    outline: 2px solid ${deepPurple[100]};
    outline-offset: 2px;
  }
`;


const NestedContainer = Container.extend`
  padding: 0;
  margin-bottom: 8px;
`;

const StyledButton = styled(Button)`
  margin-bottom: 2em !important;
`;

const Loading = styled.div`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  font-size: 0.5em;
  justify-content: center;
`;

export default function PlaylistContainer(props) {
  return (
    <StyledPlaylistContainer>
      <Title>
        Playlist management
        <Loading show={props.isFetching}>
          Loading
        </Loading>
      </Title>
      <StyledButton
        color="primary"
        size="large"
        onClick={props.addPlaylist}
      >
        Add playlist
      </StyledButton>
      <Droppable
        droppableId="PLAYLIST"
        type="PLAYLIST"
        key="PLAYLIST"
        direction="horizontal"
      >
        {(dropProvided, dropSnapshot) => (
          <Container
            innerRef={dropProvided.innerRef}
            isDraggingOver={dropSnapshot.isDraggingOver}
            {...dropProvided.droppableProps}
          >
            {props.playlists.map((playlist, index) => (
              <Draggable
                draggableId={playlist._id}
                type="PLAYLIST"
                key={playlist._id}
                index={index}
              >
                {(dragProvided, dragSnapshot) => (
                  <div>
                    <NestedContainer
                      innerRef={dragProvided.innerRef}
                      isDragging={dragSnapshot.isDragging}
                      {...dragProvided.draggableProps}
                      {...dragProvided.dragHandleProps}
                    >
                      <Playlist
                        setCurrentPlaylist={() => props.setCurrentPlaylist(playlist)}
                        deletePlaylist={() => props.deletePlaylist(playlist._id)}
                        setRedirect={props.setRedirect}
                        playlist={playlist}
                        togglePublic={() => {
                        props.togglePublic(playlist._id);
                      }}
                      />
                    </NestedContainer>
                    {dragProvided.placeholder}
                  </div>
                )}
              </Draggable>
            ))}
          </Container>
        )}
      </Droppable>
    </StyledPlaylistContainer>
  );
}


PlaylistContainer.propTypes = {
  playlists: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  isFetching: PropTypes.bool,
  addPlaylist: PropTypes.func,
  deletePlaylist: PropTypes.func,
  setCurrentPlaylist: PropTypes.func,
};

PlaylistContainer.defaultProps = {
  playlists: [],
  isFetching: false,
  addPlaylist: () => {},
  deletePlaylist: () => {},
  setCurrentPlaylist: () => {},
};
