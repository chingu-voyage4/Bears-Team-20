/* eslint-disable no-underscore-dangle */
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import equal from 'fast-deep-equal';
import { DragDropContext } from 'react-beautiful-dnd';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import PlaylistContainer from './PlaylistContainer';
import * as actions from '../../actions/user';
import * as playerActions from '../../actions/player';


const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export class PlaylistIndex extends React.Component {
  constructor() {
    super();

    this.state = {
      dragging: false,
      redirect: false,
    };

    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.togglePublic = this.togglePublic.bind(this);
    this.setRedirect = this.setRedirect.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    if (this.state.dragging && !equal(nextProps.playlists, this.props.playlists)) {
      return false;
    }
    return true;
  }

  componentWillUnmount() {
    const { playlists, setPlaylists } = this.props;
    setPlaylists(playlists);
  }

  onDragStart() {
    this.setState({ dragging: true });
  }

  onDragEnd(result) {
    const { playlists, setPlaylists } = this.props;

    this.setState({ dragging: false });
    if (!result.destination) {
      return;
    }

    // Moving playlists
    if (result.type === 'PLAYLIST') {
      const items = reorder(
        playlists,
        result.source.index,
        result.destination.index,
      );

      setPlaylists(items);
      return;
    }

    // Moving songs
    if (playlists.find(pl => pl._id === result.type)) {
      const target = playlists.find(pl => pl._id === result.type);
      const updated = {
        ...target,
        songs: reorder(
          target.songs,
          result.source.index,
          result.destination.index,
        ),
      };

      const targetIndex = playlists.findIndex(pl => pl._id === result.type);
      const newPlaylists = Array.from(playlists);
      newPlaylists[targetIndex] = updated;

      this.props.setPlaylists(newPlaylists);
    }
  }


  setRedirect() {
    this.setState({ redirect: true });
  }

  togglePublic(id) {
    const { playlists, setPlaylists } = this.props;
    const found = playlists.find(pl => pl._id === id);
    if (!found) return;

    const updated = {
      ...found,
      public: !found.public,
    };

    const targetIndex = playlists.findIndex(pl => pl._id === id);
    const newPlaylists = Array.from(playlists);
    newPlaylists[targetIndex] = updated;

    setPlaylists(newPlaylists);
  }


  render() {
    const { isFetching, errors } = this.props;
    const { redirect } = this.state;
    console.log(errors);

    if (redirect) return <Redirect to="/music" />;

    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
        onDragStart={this.onDragStart}
      >
        <PlaylistContainer
          deletePlaylist={this.props.deletePlaylist}
          addPlaylist={this.props.addPlaylist}
          setCurrentPlaylist={this.props.setCurrentPlaylist}
          playlists={this.props.playlists}
          togglePublic={this.togglePublic}
          isFetching={isFetching}
          setRedirect={this.setRedirect}
          updatePlaylistName={this.props.updatePlaylistName}
        />
      </DragDropContext>
    );
  }
}


PlaylistIndex.propTypes = {
  setPlaylists: PropTypes.func,
  addPlaylist: PropTypes.func,
  deletePlaylist: PropTypes.func,
  setCurrentPlaylist: PropTypes.func,
  updatePlaylistName: PropTypes.func,
  playlists: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  isFetching: PropTypes.bool,
  errors: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

PlaylistIndex.defaultProps = {
  setPlaylists: () => {},
  addPlaylist: () => {},
  deletePlaylist: () => {},
  setCurrentPlaylist: () => {},
  updatePlaylistName: () => {},
  playlists: [],
  isFetching: false,
  errors: [],
};


const mapStateToProps = ({ user }) => ({
  playlists: user.playlists.data,
  isFetching: user.playlists.isFetching,
  errors: user.playlists.errors,
});


const mapDispatchToProps = dispatch => ({
  setPlaylists: (playlists) => {
    dispatch(actions.setPlaylistsLocally(playlists));

    // TODO debounce playlist request
    dispatch(actions.setPlaylistsRequest(playlists));
  },
  addPlaylist: () => dispatch(actions.addPlaylistLocally()),
  deletePlaylist: (id) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            dispatch(actions.deletePlaylistLocally(id));
          },
        },
        {
          label: 'No',
        },
      ],
    });
  },
  setCurrentPlaylist: (playlist) => {
    dispatch(playerActions.playerSetPlaylist(playlist));
    if (playlist.songs.length > 0) {
      dispatch(playerActions.playerPlaySong(playlist.songs[0]));
    }
  },
  updatePlaylistName: (playlistId, name) => {
    dispatch(actions.updatePlaylistName(playlistId, name));
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(PlaylistIndex);
