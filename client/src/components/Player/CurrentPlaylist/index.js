import React from 'react';
import PropTypes from 'prop-types';
import './CurrentPlaylist.css';


export default function CurrentPlaylist(props) {
  const { playlist } = props;

  return (
    <div id="current-playlist-container" >
      <p>PLAYLIST</p>
      { playlist.map(songObj => <PlaylistItem song={songObj} />)}
    </div>
  );
}


function PlaylistItem(props) {
  const { song } = props;
  return (
    <div>
      {song.title}
    </div>
  );
}


CurrentPlaylist.propTypes = {
  playlist: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

CurrentPlaylist.defaultProps = {
  playlist: [],
};


PlaylistItem.propTypes = {
  song: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

PlaylistItem.defaultProps = {
  song: {},
};
