import React from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import { Typography, IconButton } from 'material-ui';
import { PlayArrow, Pause, VolumeUp, VolumeOff, Loop } from 'material-ui-icons';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import * as actions from '../../actions/player';
import './Player.css';


const sampleSong = {
  title: 'Test title of the coolest song in the worldddd!!!!',
  link: 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
  serviceSource: 'Youtube',
  description: null,
  thumbnail: null,
};


class PlayerComponent extends React.Component {
  static parseToHHMMSS(value) {
    const secNum = parseInt(value, 10);
    let hours = Math.floor(secNum / 3600);
    let minutes = Math.floor((secNum - (hours * 3600)) / 60);
    let seconds = secNum - (hours * 3600) - (minutes * 60);

    if (hours < 10) { hours = `0${hours}`; }
    if (minutes < 10) { minutes = `0${minutes}`; }
    if (seconds < 10) { seconds = `0${seconds}`; }
    return `${hours}:${minutes}:${seconds}`;
  }

  componentDidMount() {
    const { setCurrentSong } = this.props;
    setCurrentSong(sampleSong);
  }

  handleSeek(seekSeconds) {
    const { seekProgress } = this.props;
    seekProgress(seekSeconds);
    this.player.seekTo(parseFloat(seekSeconds));
  }


  render() {
    const {
      togglePlayPause, isPlaying,
      setVolume, volume,
      toggleMute, isMuted,
      setDuration, duration,
      setProgress, seekProgress, progress,
      toggleLoop, isLooping,
      currentSong,
    } = this.props;

    return (
      <div id="player-container">
        <div className="player-row-container">

          <div id="player-controls-playback">
            <IconButton aria-label="Play/pause" color="primary" onClick={togglePlayPause}>
              { isPlaying ?
                <Pause className="player-control-icon" />
                :
                <PlayArrow className="player-control-icon" />
              }
            </IconButton>
            <IconButton aria-label="Play/pause" color="primary" onClick={toggleLoop}>
              <Loop className={`player-control-icon ${isLooping ? 'player-control-icon-hl' : ''}`} />
            </IconButton>
          </div>

          <div id="player-song-info">
            <Typography noWrap id="player-song-title">
              {currentSong.title}
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
              <Slider
                min={0}
                max={100}
                value={volume * 100}
                onChange={setVolume}
                disabled={isMuted}
              />
            </div>
          </div>
        </div>

        {/* Progress bar, duration stuff */}
        <div className="player-row-container">
          <Slider min={0} max={duration} value={progress} onChange={seekProgress} />
          <div id="player-duration-label" >
            <Typography noWrap>
              {`${this.parseToHHMMSS(progress)} / ${this.parseToHHMMSS(duration)}`}
            </Typography>
          </div>
        </div>


        <ReactPlayer
          ref={(player) => { this.player = player; }}
          url={currentSong.link || ''}
          playing={isPlaying}
          volume={volume}
          muted={isMuted}
          loop={isLooping}
          onDuration={setDuration}
          onProgress={setProgress}
          onError={console.log}
          /* CHECKEAR QUE SE LLAME READY SI O SI?? */
          onReady={() => console.log('READY!')}
          onBuffer={() => console.log('BUFFER!')}
          id="player-engine"
          width="0px"
          height="0px"
        />
      </div>
    );
  }
}


PlayerComponent.propTypes = {
  togglePlayPause: PropTypes.func,
  setVolume: PropTypes.func,
  toggleMute: PropTypes.func,
  toggleLoop: PropTypes.func,
  setDuration: PropTypes.func,
  setProgress: PropTypes.func,
  seekProgress: PropTypes.func,
  setCurrentSong: PropTypes.func,
  isPlaying: PropTypes.bool,
  volume: PropTypes.number,
  isMuted: PropTypes.bool,
  isLooping: PropTypes.bool,
  duration: PropTypes.number,
  progress: PropTypes.number,
  currentSong: {
    title: PropTypes.string,
    link: PropTypes.string,
    serviceSource: PropTypes.string,
    description: PropTypes.string,
    thumbnail: PropTypes.string,
  },
};

PlayerComponent.defaultProps = {
  togglePlayPause: () => {},
  setVolume: () => {},
  toggleMute: () => {},
  toggleLoop: () => {},
  setDuration: () => {},
  setProgress: () => {},
  seekProgress: () => {},
  setCurrentSong: () => {},
  isPlaying: false,
  volume: 1,
  isMuted: false,
  isLooping: false,
  duration: 0,
  progress: 0,
  currentSong: {},
};

const mapStateToProps = ({ player }) => ({
  isPlaying: player.isPlaying,
  volume: player.volume,
  isMuted: player.isMuted,
  isLooping: player.isLooping,
  duration: player.duration,
  progress: player.progress,
  currentSong: player.currentSong,
});


const mapDispatchToProps = dispatch => ({
  togglePlayPause: () => dispatch(actions.playerPlayPause()),
  setVolume: val => dispatch(actions.playerSetVolume(val / 100)),
  toggleMute: () => dispatch(actions.playerToggleMute()),
  toggleLoop: () => dispatch(actions.playerToggleLoop()),
  setDuration: duration => dispatch(actions.playerSetDuration(duration)),
  setProgress: progressObj => dispatch(actions.playerSetProgress(progressObj.playedSeconds)),
  seekProgress: seekSeconds => dispatch(actions.playerSetProgress(seekSeconds)),
  setCurrentSong: currentSong => dispatch(actions.playerSetSong(currentSong)),
});


export default connect(mapStateToProps, mapDispatchToProps)(PlayerComponent);
