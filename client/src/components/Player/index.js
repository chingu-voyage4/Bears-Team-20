import React from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import { Typography, IconButton } from 'material-ui';
import { PlayArrow, Pause, VolumeUp, VolumeOff } from 'material-ui-icons';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import * as actions from '../../actions/player';
import './Player.css';

function PlayerComponent(props) {
  const {
    onPlay, isPlaying
    , setVolume, volume,
    toggleMute, isMuted,
  } = props;
  return (
    <div id="player-container">
      <div className="player-row-container">

        <div id="player-controls-playback">
          <IconButton aria-label="Play/pause" color="primary" onClick={onPlay}>
            { isPlaying ?
              <Pause className="player-control-icon" />
              :
              <PlayArrow className="player-control-icon" />
            }
          </IconButton>
        </div>

        <div id="player-song-info">
          <Typography>
              Song title
          </Typography>
        </div>

        <div id="player-controls-volume">
          <IconButton aria-label="Volume" color="primary" onClick={toggleMute}>
            { isMuted ?
              <VolumeOff className="player-control-icon" />
            :
              <VolumeUp className="player-control-icon" />
            }

          </IconButton>
          <div id="player-volume-slider">
            <Slider min={0} max={100} value={volume * 100} onChange={setVolume} />
          </div>
        </div>
      </div>

      <div className="player-row-container">
        <Slider min={0} max={100} value={volume * 100} onChange={setVolume} />
      </div>


      <ReactPlayer
        url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
        playing={isPlaying}
        volume={volume}
        muted={isMuted}
        id="player-player"
        width="0px"
        height="0px"
      />
    </div>
  );
}


PlayerComponent.propTypes = {
  onPlay: PropTypes.func,
  setVolume: PropTypes.func,
  toggleMute: PropTypes.func,
  isPlaying: PropTypes.bool,
  volume: PropTypes.number,
  isMuted: PropTypes.bool,
};

PlayerComponent.defaultProps = {
  onPlay: () => {},
  setVolume: () => {},
  toggleMute: () => {},
  isPlaying: false,
  volume: 1,
  isMuted: false,
};

const mapStateToProps = ({ player }) => ({
  isPlaying: player.isPlaying,
  volume: player.volume,
  isMuted: player.isMuted,
});


const mapDispatchToProps = dispatch => ({
  onPlay: () => dispatch(actions.playerPlayPause()),
  setVolume: val => dispatch(actions.playerSetVolume(val / 100)),
  toggleMute: () => dispatch(actions.playerToggleMute()),
});


export default connect(mapStateToProps, mapDispatchToProps)(PlayerComponent);
