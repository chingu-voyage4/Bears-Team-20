import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import debouce from 'debounce';
import styled from 'styled-components';
import { deepPurple } from 'material-ui/colors';

import SearchInput from './SearchInput';
import SearchResults from './SearchResults';
import * as actions from '../../actions/search';
import * as playerActions from '../../actions/player';
import * as userActions from '../../actions/user';


const SearchContainer = styled.div`
  margin-bottom: 5em;
  height: 100%;
`;

const SearchInputContainer = styled.div`
  &::placeholder {
    text-align: left;
  }
`;

const SearchResultsContainer = styled.div`
  height: 100%;
`;

const SearchResultsPlaceholder = styled.div`
  display: flex;
  height: 100%;

  padding-top: 10vh;
  justify-content: center;
  user-select: none;
  color: ${deepPurple[50]};
  font-size: 2em;
`;


export class SearchComponent extends Component {
  constructor(props) {
    super(props);

    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.debouncedSearch = debouce(this.debouncedSearch, 500);
  }

  handleSearch() {
    const { search, input } = this.props;
    search(input);
  }

  handleSearchInputChange(e) {
    const { inputChange } = this.props;
    inputChange(e.target.value);
    this.debouncedSearch();
  }

  debouncedSearch() {
    this.handleSearch();
  }

  render() {
    const {
      errors, input, isFetching, results,
      playSong, addTrackToPlaylist, playlists,
    } = this.props;
    if (errors.length) console.log('ERRORS', errors);

    return (
      <SearchContainer>
        <SearchInputContainer>
          <SearchInput
            value={input}
            onChange={this.handleSearchInputChange}
            onEnter={this.handleSearch}
            isFetching={isFetching}
          />
        </SearchInputContainer>
        <SearchResultsContainer>
          { results.length !== 0 ?
            <SearchResults
              results={results}
              isFetching={isFetching}
              playSong={playSong}
              addTrackToPlaylist={addTrackToPlaylist}
              playlists={playlists}
            />
          :
            <SearchResultsPlaceholder>
            Search and listen your favorite music
            </SearchResultsPlaceholder>
          }

        </SearchResultsContainer>
      </SearchContainer>
    );
  }
}


SearchComponent.propTypes = {
  errors: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  results: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  playlists: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  isFetching: PropTypes.bool,
  input: PropTypes.string,
  inputChange: PropTypes.func,
  search: PropTypes.func,
  playSong: PropTypes.func,
  addTrackToPlaylist: PropTypes.func,
};

SearchComponent.defaultProps = {
  errors: [],
  isFetching: false,
  results: [],
  playlists: {},
  input: '',
  inputChange: () => {},
  search: () => {},
  playSong: () => {},
  addTrackToPlaylist: () => {},
};

const mapStateToProps = ({ search, user }) => ({
  errors: search.errors,
  isFetching: search.isFetching,
  results: search.results,
  input: search.input,
  playlists: user.playlists.data,
});


const mapDispatchToProps = dispatch => ({
  inputChange: input => dispatch(actions.searchInputChange(input)),
  search: (input) => {
    if (!input.length) return;
    dispatch(actions.searchRequest(input));
  },
  playSong: song => dispatch(playerActions.playerPlaySong(song)),
  addTrackToPlaylist: (track, playlist) =>
    dispatch(userActions.addTrackToPlaylist(track, playlist)),
});


export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
