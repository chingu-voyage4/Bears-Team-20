import React from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import Controls from './Controls';
import * as actions from '../../actions/player';
import './Player.css';

function PlayerComponent(props) {
  const { onPlay } = props;
  return (
    <div id="player-container">
      PLAYER!!
      <ReactPlayer
        url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
        autoplay
        id="player-player"
      />
      <Controls onPlay={onPlay} />
    </div>
  );
}


PlayerComponent.propTypes = {
  onPlay: PropTypes.func,
};

PlayerComponent.defaultProps = {
  onPlay: () => {},
};

const mapStateToProps = ({ login }) => ({
  errors: login.errors,
  isFetching: login.isFetching,
  pause: login.pause,
});


const mapDispatchToProps = dispatch => ({
  onPlay: () => {
    dispatch(actions.playerPlayPause());
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(PlayerComponent);
