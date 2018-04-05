import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { deepPurple } from 'material-ui/colors';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Playlist from './Playlist';


const grid = 8;


const Title = styled.div`
color: ${deepPurple[900]};
font-size: 2em;
margin: 1em 0;
`;


const Container = styled.div`
  background-color: ${({ isDraggingOver }) => (isDraggingOver ? deepPurple.lighter : deepPurple.light)};
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


const NestedContainer = Container.extend`
  padding: 0;
  margin-bottom: ${grid}px;
`;


export default function PlaylistContainer(props) {
  return (
    <div>
      <Title>Playlist management</Title>
      <Droppable
        droppableId="PLAYLIST"
        type="PLAYLIST"
        key="PLAYLIST"
      >
        {(dropProvided, dropSnapshot) => (
          <Container
            innerRef={dropProvided.innerRef}
            isDraggingOver={dropSnapshot.isDraggingOver}
            {...dropProvided.droppableProps}
          >
            {props.playlists.map((playlist, index) => (
              <Draggable
                draggableId={playlist.id}
                type="PLAYLIST"
                key={playlist.id}
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
                      <Playlist playlist={playlist} />
                    </NestedContainer>
                    {dragProvided.placeholder}
                  </div>
                )}
              </Draggable>
            ))}
          </Container>
        )}
      </Droppable>
    </div>
  );
}


PlaylistContainer.propTypes = {
  playlists: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

PlaylistContainer.defaultProps = {
  playlists: [],
};
