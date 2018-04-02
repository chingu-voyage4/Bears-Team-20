/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import { Typography, IconButton } from 'material-ui';
import { PlayArrow, Pause, VolumeUp, VolumeOff, Loop, PlaylistPlay } from 'material-ui-icons';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styled from 'styled-components';

import CurrentPlaylist from './CurrentPlaylist';
import * as actions from '../../actions/player';




const PlayerContainer = styled.div`
  display: flex;
  min-height: 10vh;
  flex-direction: column;
  
  border-top: 1px solid black;
  background-color: white;
  padding: 0 2em;

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;

const PlayerOverlay = styled.div`
  z-index: 999;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: rgba(255,255,255,0.5);

  display: ${props => (props.isShowing ? 'none' : 'block')};
`;

const PlayerRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex: 1;

  align-items: center;
`;

const PlayerDurationLabel = styled(DurationLabel)`
  display: flex !important;
  margin-left: 1em !important;  
`;

const StyledPlayerSongInfo = styled(PlayerSongInfo)`
  display: flex;
  flex: 1;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  overflow: hidden;
`

const PlayerVolumeControls = styled.div`
  display: flex;
  flex-direction: row;
  
  min-width: 30vh;
`

const VolumeSliderContainer = styled.div`
  width: 100%;
  display: flex;

  justify-content: center;
  flex-direction: column;
  text-align: center;
`

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
      <PlayerContainer>

        <PlayerOverlay isShowing={Boolean(isReady) && Boolean(currentSong.link)} />

        <CurrentPlaylist
          isShowing={plShowing}
          playlist={currentPlaylist}
          setSong={setCurrentSong}
        />

        <PlayerRowContainer>
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

          <StyledPlayerSongInfo>
            {currentSong.title}
          </StyledPlayerSongInfo>

          <PlayerVolumeControls>

            <IconButton aria-label="Volume" color="primary" onClick={toggleMute}>
              { isMuted ?
                <VolumeOff className="player-control-icon" color="secondary" />
              :
                <VolumeUp className="player-control-icon" color="primary" />
              }

            </IconButton>

            <VolumeSliderContainer>
              <Slider
                min={0}
                max={100}
                value={volume * 100}
                onChange={setVolume}
                disabled={isMuted}
              />
            </VolumeSliderContainer>

          </PlayerVolumeControls>

        </PlayerRowContainer>

        {/* Progress bar, duration stuff */}
        <PlayerRowContainer>
          <Slider min={0} max={duration} value={progress} onChange={this.handleSeek} />
          <PlayerDurationLabel >
            {`${parseToHHMMSS(progress)} / ${parseToHHMMSS(duration)}`}
          </PlayerDurationLabel>
        </PlayerRowContainer>


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

      </PlayerContainer>
    );
  }
}


function DurationLabel(props) {
  return (
    <div className={props.className}>
      <Typography noWrap>
        { props.children }
      </Typography>

    </div>
  );
}

function PlayerSongInfo(props) {
  return(
    <div className={props.className}>
      <Typography noWrap>
        {props.children}
      </Typography>
    </div>
  )
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
