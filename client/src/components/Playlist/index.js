import React from 'react';
import styled from 'styled-components';
import { deepPurple } from 'material-ui/colors';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const PlaylistContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const Title = styled.div`
  color: ${deepPurple[900]};
  font-size: 2em;
  margin: 1em 0;
`;
const grid = 8;

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',
  // styles we need to apply on draggables
  ...draggableStyle,
});

export default class Playlist extends React.Component {
  constructor() {
    super();
    this.state = {
      playLists: [
        { name: 'Play1', id: '1' },
        { name: 'Play2', id: '2' },
        { name: 'Play3', id: '3' },
      ],
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    const items = reorder(
      this.state.playLists,
      result.source.index,
      result.destination.index,
    );
    this.setState({ playLists: items });
  }
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <PlaylistContainer>
          <Title>Playlist management</Title>
          <Droppable droppableId="playlist">
            {provided => (
              <div ref={provided.innerRef}>
                {this.state.playLists.map((x, index) =>
            (
              <Draggable draggableId={x.id} key={x.id} index={index}>
                {(draggableProvided, snapshot) => (
                  <div ref={draggableProvided.innerRef}>
                    <div
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        draggableProvided.draggableProps.style,
                      )}
                    >
                      {x.name}
                    </div>
                    {draggableProvided.placeholder}
                  </div>
              )}
              </Draggable >))}
              </div>
            )}
          </Droppable>
        </PlaylistContainer>
      </DragDropContext>
    );
  }
}
