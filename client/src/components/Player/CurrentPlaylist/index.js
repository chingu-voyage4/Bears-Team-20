import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const CurrentPlaylistContainer = styled.div`
  display: ${props => (props.isShowing ? 'flex' : 'none')};
  position: absolute;

  width: 33vw;
  height: 45vh;
  
  top: -45vh;
  left: 0vw;


  background-color: white;
  border: 1px solid black;
  border-bottom: none;
`;


export default function CurrentPlaylist(props) {
  const { playlist, isShowing } = props;

  return (
    <CurrentPlaylistContainer isShowing={isShowing}>
      <p>PLAYLIST</p>
      { playlist.map(songObj => <PlaylistItem key={songObj.link} song={songObj} />)}
    </CurrentPlaylistContainer>
  );
}


function PlaylistItem(props) {
  const { song } = props;
  return (
    <React.Fragment>
      <td>{song.title}</td>
    </React.Fragment>
  );
}


CurrentPlaylist.propTypes = {
  playlist: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  isShowing: PropTypes.bool,
};

CurrentPlaylist.defaultProps = {
  playlist: [],
  isShowing: false,
};


PlaylistItem.propTypes = {
  song: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

PlaylistItem.defaultProps = {
  song: {},
};
