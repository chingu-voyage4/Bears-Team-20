import React from 'react';
import PropTypes from 'prop-types';
import { Typography, IconButton } from 'material-ui';
import Card, { CardContent } from 'material-ui/Card';
import { PlaylistAdd, PlayArrow } from 'material-ui-icons';
import './ResultItem.css';


export default function ResultItem(props) {
  const { result } = props;
  return (
    <div>
      <Card className="result-item-card">
        <div className="result-item-details">
          <CardContent className="result-item-content">
            <Typography variant="headline">{result.title}</Typography>
            <Typography variant="subheading" color="textSecondary">
              {result.description || 'NO DESCR!!'}
            </Typography>
          </CardContent>
          <div className="result-item-controls">
            <IconButton aria-label="Add to playlist" color="primary">
              <PlaylistAdd />
            </IconButton>
            <IconButton aria-label="Play/pause" color="primary">
              <PlayArrow className="result-item-play-icon" />
            </IconButton>
          </div>
        </div>
        <img
          className="result-item-cover"
          src={result.thumbnail}
          title={result.title}
          alt={result.title}
        />
      </Card>
    </div>
  );
}


ResultItem.propTypes = {
  result: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

ResultItem.defaultProps = {
  result: {},
};

