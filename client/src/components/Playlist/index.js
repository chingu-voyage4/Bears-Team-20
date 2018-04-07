/* eslint-disable no-underscore-dangle */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import equal from 'fast-deep-equal';
import { DragDropContext } from 'react-beautiful-dnd';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import PlaylistContainer from './PlaylistContainer';
import * as actions from '../../actions/user';


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
    };

    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.togglePublic = this.togglePublic.bind(this);
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
    console.log(errors);

    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
        onDragStart={this.onDragStart}
      >
        <PlaylistContainer
          deletePlaylist={this.props.deletePlaylist}
          addPlaylist={this.props.addPlaylist}
          playlists={this.props.playlists}
          togglePublic={this.togglePublic}
          isFetching={isFetching}
        />
      </DragDropContext>
    );
  }
}


PlaylistIndex.propTypes = {
  setPlaylists: PropTypes.func,
  addPlaylist: PropTypes.func,
  deletePlaylist: PropTypes.func,
  playlists: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  isFetching: PropTypes.bool,
  errors: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

PlaylistIndex.defaultProps = {
  setPlaylists: () => {},
  addPlaylist: () => {},
  deletePlaylist: () => {},
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
});


export default connect(mapStateToProps, mapDispatchToProps)(PlaylistIndex);
