import React from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import { Typography, IconButton } from 'material-ui';
import { PlayArrow, Pause, VolumeUp, VolumeOff, Loop, PlaylistPlay } from 'material-ui-icons';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import CurrentPlaylist from './CurrentPlaylist';
import * as actions from '../../actions/player';
import './Player.css';


function parseToHHMMSS(value) {
  const secNum = parseInt(value, 10);
  let hours = Math.floor(secNum / 3600);
  let minutes = Math.floor((secNum - (hours * 3600)) / 60);
  let seconds = secNum - (hours * 3600) - (minutes * 60);

  if (hours < 10) { hours = `0${hours}`; }
  if (minutes < 10) { minutes = `0${minutes}`; }
  if (seconds < 10) { seconds = `0${seconds}`; }
  return `${hours}:${minutes}:${seconds}`;
}


class PlayerComponent extends React.Component {
  constructor(props) {
    super(props);

    this.handleSeek = this.handleSeek.bind(this);
    this.handleShowPlaylist = this.handleShowPlaylist.bind(this);
  }

  handleSeek(seekSeconds) {
    const { seekProgress } = this.props;
    seekProgress(seekSeconds);
    this.engine.seekTo(parseFloat(seekSeconds));
  }

  handleShowPlaylist() {
    const { setPlaylistShow, plShowing } = this.props;
    setPlaylistShow(!plShowing);
  }

  render() {
    const {
      setReady, isReady,
      togglePlayPause, isPlaying, setPlay, setPause,
      setVolume, volume,
      toggleMute, isMuted,
      setDuration, duration,
      setProgress, progress,
      toggleLoop, isLooping,
      currentSong, setCurrentSong,
      currentPlaylist, plShowing,
    } = this.props;

    return (
      <div id="player-container" disabled={!isReady || !currentSong.link}>
        <div id="player-overlay" className={`${!isReady || !currentSong.link ? '' : 'player-hidden'}`} />
        <CurrentPlaylist
          isShowing={plShowing}
          playlist={currentPlaylist}
          setSong={setCurrentSong}
        />
        <div className="player-row-container">
          <div id="player-controls-playback">
            <IconButton aria-label="Play/pause" color="primary" onClick={togglePlayPause}>
              { isPlaying ?
                <Pause className="player-control-icon" color="secondary" />
                :
                <PlayArrow className="player-control-icon" color="primary" />
              }
            </IconButton>
            <IconButton
              aria-label="Toggle loop"
              color={isLooping ? 'secondary' : 'primary'}
              onClick={toggleLoop}
            >
              <Loop className="player-control-icon" />
            </IconButton>

            <IconButton
              aria-label="Current playlist"
              color={plShowing ? 'secondary' : 'primary'}
              onClick={this.handleShowPlaylist}
            >
              <PlaylistPlay className="player-control-icon" />
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
                <VolumeOff className="player-control-icon" color="secondary" />
              :
                <VolumeUp className="player-control-icon" color="primary" />
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
          <Slider min={0} max={duration} value={progress} onChange={this.handleSeek} />
          <div id="player-duration-label" >
            <Typography noWrap>
              {`${parseToHHMMSS(progress)} / ${parseToHHMMSS(duration)}`}
            </Typography>
          </div>
        </div>


        <ReactPlayer
          ref={(engine) => { this.engine = engine; }}
          url={currentSong.link || ''}
          playing={isPlaying}
          volume={volume}
          muted={isMuted}
          loop={isLooping}
          onDuration={setDuration}
          onProgress={setProgress}
          onError={console.log}
          onReady={setReady}
          onBuffer={() => console.log('BUFFER!')}
          onStart={setPlay}
          onPause={setPause}
          id="player-engine"
          width="0px"
          height="0px"
        />
      </div>
    );
  }
}


PlayerComponent.propTypes = {
  setReady: PropTypes.func,
  togglePlayPause: PropTypes.func,
  setPlay: PropTypes.func,
  setPause: PropTypes.func,
  setVolume: PropTypes.func,
  toggleMute: PropTypes.func,
  toggleLoop: PropTypes.func,
  setDuration: PropTypes.func,
  setProgress: PropTypes.func,
  seekProgress: PropTypes.func,
  setCurrentSong: PropTypes.func,
  setPlaylistShow: PropTypes.func,

  isReady: PropTypes.bool,
  isPlaying: PropTypes.bool,
  volume: PropTypes.number,
  isMuted: PropTypes.bool,
  isLooping: PropTypes.bool,
  duration: PropTypes.number,
  progress: PropTypes.number,
  currentSong: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  currentPlaylist: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  plShowing: PropTypes.bool,
};

PlayerComponent.defaultProps = {
  setReady: () => {},
  togglePlayPause: () => {},
  setPlay: () => {},
  setPause: () => {},
  setVolume: () => {},
  toggleMute: () => {},
  toggleLoop: () => {},
  setDuration: () => {},
  setProgress: () => {},
  seekProgress: () => {},
  setCurrentSong: () => {},
  setPlaylistShow: () => {},

  isReady: false,
  isPlaying: false,
  volume: 1,
  isMuted: false,
  isLooping: false,
  duration: 0,
  progress: 0,
  currentSong: {},
  currentPlaylist: [],
  plShowing: false,
};

const mapStateToProps = ({ player }) => ({
  isReady: player.isReady,
  isPlaying: player.isPlaying,
  volume: player.volume,
  isMuted: player.isMuted,
  isLooping: player.isLooping,
  duration: player.duration,
  progress: player.progress,
  currentSong: player.currentSong,
  currentPlaylist: player.currentPlaylist,
  plShowing: player.plShowing,
});


const mapDispatchToProps = dispatch => ({
  setReady: () => dispatch(actions.playerSetReady(true)),
  togglePlayPause: () => dispatch(actions.playerPlayPause()),
  setPlay: () => dispatch(actions.playerSetPlay()),
  setPause: () => dispatch(actions.playerSetPause()),
  setVolume: val => dispatch(actions.playerSetVolume(val / 100)),
  toggleMute: () => dispatch(actions.playerToggleMute()),
  toggleLoop: () => dispatch(actions.playerToggleLoop()),
  setDuration: duration => dispatch(actions.playerSetDuration(duration)),
  setProgress: progressObj => dispatch(actions.playerSetProgress(progressObj.playedSeconds)),
  seekProgress: seekSeconds => dispatch(actions.playerSetProgress(seekSeconds)),
  setCurrentSong: song => dispatch(actions.playerSetSong(song)),
  setPlaylistShow: isShowing => dispatch(actions.playerSetPlaylistShow(isShowing)),
});


export default connect(mapStateToProps, mapDispatchToProps)(PlayerComponent);
