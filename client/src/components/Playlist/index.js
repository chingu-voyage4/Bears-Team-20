import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-beautiful-dnd';
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

    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    const { playlists, setPlaylists } = this.props;
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
    if (playlists.find(pl => pl.id === result.type)) {
      const target = playlists.find(pl => pl.id === result.type);
      const updated = {
        ...target,
        songs: reorder(
          target.songs,
          result.source.index,
          result.destination.index,
        ),
      };

      const targetIndex = playlists.findIndex(pl => pl.id === result.type);
      const newPlaylists = Array.from(playlists);
      newPlaylists[targetIndex] = updated;

      this.props.setPlaylists(newPlaylists);
    }
  }


  render() {
    const { isFetching, errors } = this.props;
    console.log(isFetching, errors);

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <PlaylistContainer playlists={this.props.playlists} />
      </DragDropContext>
    );
  }
}


PlaylistIndex.propTypes = {
  setPlaylists: PropTypes.func,
  playlists: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  isFetching: PropTypes.bool,
  errors: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

PlaylistIndex.defaultProps = {
  setPlaylists: () => {},
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
});


export default connect(mapStateToProps, mapDispatchToProps)(PlaylistIndex);
