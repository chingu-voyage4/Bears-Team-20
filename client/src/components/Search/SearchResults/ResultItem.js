import React from 'react';
import PropTypes from 'prop-types';
import { Typography, IconButton } from 'material-ui';
import { PlaylistAdd, PlayArrow } from 'material-ui-icons';
import './ResultItem.css';


export default class ResultItem extends React.Component {
  handlePlayClickGen(songObj) {
    const { playSong } = this.props;
    return () => playSong(songObj);
  }

  render() {
    const { result } = this.props;
    return (
      <div>
        <div className="result-item-card">
          <div className="result-item-details">
            <div className="result-item-content">
              <Typography variant="headline">{result.title}</Typography>
              <Typography variant="body1" color="textSecondary" >
                {result.description.length > 75 ?
                `${result.description.substr(0, 75)}...`
                :
                result.description
                }
              </Typography>
            </div>
            <div className="result-item-controls">
              <IconButton aria-label="Add to playlist" color="primary">
                <PlaylistAdd />
              </IconButton>
              <IconButton
                aria-label="Play/pause"
                color="primary"
                onClick={this.handlePlayClickGen(result)}
              >
                <PlayArrow className="result-item-play-icon" />
              </IconButton>
            </div>
          </div>
          <div className="result-item-cover">
            <img
              src={result.thumbnail}
              title={result.title}
              alt={result.title}
            />
          </div>
        </div>
      </div>
    );
  }
}


ResultItem.propTypes = {
  result: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  playSong: PropTypes.func,
};

ResultItem.defaultProps = {
  result: {},
  playSong: () => {},
};

