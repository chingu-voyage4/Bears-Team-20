/* eslint-disable react/no-array-index-key */
/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { deepPurple } from 'material-ui/colors';


const CurrentPlaylistContainer = styled.div`
  display: ${props => (props.isShowing ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;

  width: 33vw;
  height: 45vh;
  
  top: -45vh;
  left: 0vw;


  background-color: white;
  border: 1px solid rgba(0,0,0,0.4);
  border-bottom: none;
`;

const Title = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  overflow: hidden;
`;

const SongContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledSong = styled(Song)`
  display: flex;
  flex-direction: column;
  flex: 1;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: ${deepPurple[100]};
  }
`;

const SongTitle = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
`;

const SongArtist = styled.div`
  font-size: 0.75rem;
  color: rgba(0,0,0,0.75);
`;

export default function CurrentPlaylist(props) {
  const { playlist, isShowing, setSong } = props;

  return (
    <CurrentPlaylistContainer isShowing={isShowing}>
      <Title>{playlist.name}</Title>
      <SongContainer>
        { playlist.songs.map((songObj, i) =>
          (<StyledSong
            key={`${i}_${songObj.link}`}
            song={songObj}
            onClick={() => setSong(songObj)}
          />)) }
      </SongContainer>
    </CurrentPlaylistContainer>
  );
}


function Song(props) {
  const { song } = props;
  return (
    <div className={props.className} onClick={props.onClick} role="main">
      <SongTitle>{song.title}</SongTitle>
      <SongArtist>{song.artist}</SongArtist>
    </div>
  );
}


CurrentPlaylist.propTypes = {
  playlist: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  isShowing: PropTypes.bool,
  setSong: PropTypes.func,
};

CurrentPlaylist.defaultProps = {
  playlist: {},
  isShowing: false,
  setSong: () => {},
};


Song.propTypes = {
  song: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  className: PropTypes.string,
  onClick: PropTypes.func, // eslint-disable-line react/forbid-prop-types
};

Song.defaultProps = {
  song: {},
  className: '',
  onClick: () => {},
};
