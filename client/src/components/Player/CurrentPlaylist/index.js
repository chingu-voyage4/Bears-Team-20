import React from 'react';
import PropTypes from 'prop-types';
import './CurrentPlaylist.css';


export default function CurrentPlaylist(props) {
  const { playlist, isShowing } = props;

  return (
    <div
      id="current-playlist-container"
      className={`${isShowing ? '' : 'player-hidden'}`}
    >
      <p>PLAYLIST</p>
      { playlist.map(songObj => <PlaylistItem key={songObj.link} song={songObj} />)}
    </div>
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
