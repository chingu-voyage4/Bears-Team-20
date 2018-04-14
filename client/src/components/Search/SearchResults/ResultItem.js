/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { Typography, IconButton } from 'material-ui';
import { PlaylistAdd, PlayArrow } from 'material-ui-icons';
import styled from 'styled-components';
import { deepPurple } from 'material-ui/colors';
import Menu, { MenuItem } from 'material-ui/Menu';


const ResultItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  border-width: 1px;
  border-color: #f3e5f5;
  border-style: solid;

  &:hover {
    background-color: ${deepPurple[50]};
  }
`;

const ResultItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex: 4 0 0;
`;

const ResultItemCover = styled(ItemCover)`
  display: flex;
  justify-content: flex-end;
  flex: 1 0 0;

  @media only screen and (max-width : 650px) {
    display: none;
  }
`;

const StyledImg = styled.img`
  width: 100%;
  max-width: 150px; /* arbitrary number, works well with youtube thumbnails*/
`;

const ResultItemControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StyledPlayArrow = styled(PlayArrow)`
  height: 1.5em !important;
  width: 1.5em !important;

  color: ${deepPurple[900]};
`;


export default class ResultItem extends React.Component {
  constructor() {
    super();
    this.state = { openPlaylists: null };
    this.openPlaylistsMenu = this.openPlaylistsMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handlePlayClickGen(songObj) {
    const { playSong } = this.props;
    return () => playSong(songObj);
  }

  openPlaylistsMenu(event) {
    this.setState({ openPlaylists: event.currentTarget });
  }

  handleClose() {
    this.setState({ openPlaylists: null });
  }

  render() {
    const { result, addTrackToPlaylist, playlists } = this.props;
    return (
      <ResultItemContainer>
        <ResultItemDetails>
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
          <ResultItemControls>
            <IconButton
              aria-owns={this.state.openPlaylists ? 'playlist-menu' : null}
              aria-haspopup="true"
              aria-label="Add to playlist"
              color="primary"
              onClick={this.openPlaylistsMenu}
            >
              <PlaylistAdd />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={this.state.openPlaylists}
              open={!!this.state.openPlaylists}
              onClose={this.handleClose}
            >
              {playlists.map((playlist, i) => (
                <MenuItem
                  key={i}
                  onClick={() => addTrackToPlaylist(result, playlist._id)}
                >
                  {playlist.name}
                </MenuItem>
              ))}
            </Menu>
            <IconButton
              aria-label="Play/pause"
              color="primary"
              onClick={this.handlePlayClickGen(result)}
            >
              <StyledPlayArrow className="result-item-play-icon" />
            </IconButton>
          </ResultItemControls>
        </ResultItemDetails>

        <ResultItemCover
          src={result.thumbnail}
          title={result.title}
          alt={result.title}
        />
      </ResultItemContainer>
    );
  }
}

function ItemCover(props) {
  return (
    <div className={props.className}>
      <StyledImg src={props.src} title={props.title} alt={props.alt} />
    </div>
  );
}


ResultItem.propTypes = {
  addTrackToPlaylist: PropTypes.func,
  result: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  playSong: PropTypes.func,
};

ResultItem.defaultProps = {
  result: {},
  addTrackToPlaylist: () => {},
  playSong: () => {},
};

