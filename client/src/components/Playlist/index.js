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
    this.state = {
      playlists: [
        {
          id: 'pl_1',
          title: 'playlistName 1',
          songs: [
            { title: 'Play1', id: 'song_1' },
            { title: 'Play2', id: 'song_2' },
            { title: 'Play3', id: 'song_3' },
          ],
        },
        {
          id: 'pl_2',
          title: 'playlistName 2',
          songs: [
            { title: 'Play4', id: 'song_4' },
            { title: 'Play5', id: 'song_5' },
            { title: 'Play6', id: 'song_6' },
          ],
        },
      ],
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    // Moving playlists
    if (result.type === 'PLAYLIST') {
      const items = reorder(
        this.state.playlists,
        result.source.index,
        result.destination.index,
      );
      this.setState({ playlists: items });

      this.props.setPlaylists(items);
      return;
    }

    // Moving songs
    if (this.state.playlists.find(pl => pl.id === result.type)) {
      const target = this.state.playlists.find(pl => pl.id === result.type);
      const updated = {
        ...target,
        songs: reorder(
          target.songs,
          result.source.index,
          result.destination.index,
        ),
      };

      const targetIndex = this.state.playlists.findIndex(pl => pl.id === result.type);
      const playlists = Array.from(this.state.playlists);
      playlists[targetIndex] = updated;


      this.setState({
        playlists,
      });

      this.props.setPlaylists(playlists);
    }
  }


  render() {
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
      >
        <PlaylistContainer playlists={this.state.playlists} />
      </DragDropContext>
    );
  }
}


PlaylistIndex.propTypes = {
  setPlaylists: PropTypes.func,
};

PlaylistIndex.defaultProps = {
  setPlaylists: () => {},
};


const mapStateToProps = ({ user }) => ({
  playlists: user.playlists.data,
  isFetching: user.playlists.isFetching,
  errors: user.playlists.errors,
});


const mapDispatchToProps = dispatch => ({
  setPlaylists: playlists => dispatch(actions.setPlaylistsRequest(playlists)),
});


export default connect(mapStateToProps, mapDispatchToProps)(PlaylistIndex);
