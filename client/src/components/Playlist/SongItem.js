// @flow
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { colors, IconButton } from 'material-ui';
import { Delete } from 'material-ui-icons';

const grid = 8;
const borderRadius = 2;

const Container = styled.a`
border-radius: ${borderRadius}px;
border: 1px solid grey;
background-color: ${({ isDragging }) => (isDragging ? colors.deepPurple[50] : colors.deepPurple[100])};

box-shadow: ${({ isDragging }) => (isDragging ? `2px 2px 1px ${colors.shadow}` : 'none')};
padding: ${grid}px;
min-height: 40px;
margin-bottom: ${grid}px;
user-select: none;
transition: background-color 0.1s ease;
/* anchor overrides */
color: ${colors.black};

&:hover {
    color: ${colors.black};
    text-decoration: none;
}
&:focus {
    outline: 2px solid ${colors.purple};
    box-shadow: none;
}
/* flexbox */
display: flex;
align-items: center;

min-width: 20vw;
`;

const Avatar = styled.img`
width: 40px;
height: 40px;
border-radius: 50%;
margin-right: ${grid}px;
flex-shrink: 0;
flex-grow: 0;
`;

const Content = styled.div`
/* flex child */
flex-grow: 1;

/* Needed to wrap text in ie11 */
/* https://stackoverflow.com/questions/35111090/why-ie11-doesnt-wrap-the-text-in-flexbox */
flex-basis: 100%

/* flex parent */
display: flex;
flex-direction: column;
`;

const BlockQuote = styled.div`
&::before {
    content: open-quote;
}

&::after {
    content: close-quote;
}
`;

const Footer = styled.div`
display: flex;
margin-top: ${grid}px;
`;

const Attribution = styled.small`
margin: 0;
margin-left: ${grid}px;
text-align: right;
flex-grow: 1;

max-height: 3rem;
overflow: hidden;
text-overflow: ellipsis;
`;

// Previously this extended React.Component
// That was a good thing, because using React.PureComponent can hide
// issues with the selectors. However, moving it over does can considerable
// performance improvements when reordering big lists (400ms => 200ms)
// Need to be super sure we are not relying on PureComponent here for
// things we should be doing in the selector as we do not know if consumers
// will be using PureComponent
export default class SongItem extends React.PureComponent {
  render() {
    const { song, isDragging, provided } = this.props;

    return (
      <Container
        href={song.author}
        isDragging={isDragging}
        innerRef={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <Avatar src={song.thumbnail} alt={song.title} />
        <Content>
          <BlockQuote>{song.title}</BlockQuote>
          <Footer>
            <Attribution>{song.description}</Attribution>
          </Footer>
        </Content>

        <IconButton>
          <Delete />
        </IconButton>
      </Container>
    );
  }
}


SongItem.propTypes = {
  song: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  isDragging: PropTypes.bool,
  provided: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

SongItem.defaultProps = {
  song: {},
  isDragging: false,
  provided: {},
};
