import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';
import * as actions from '../../actions/search';
import './Search.css';


export class SearchComponent extends Component {
  constructor(props) {
    super(props);

    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch() {
    const { search, input } = this.props;
    search(input);
  }


  handleSearchInputChange(e) {
    const { inputChange } = this.props;
    inputChange(e.target.value);
  }


  render() {
    const {
      errors, input, isFetching, results,
    } = this.props;
    if (errors.length) console.log('ERRORS', errors);

    return (
      <div id="search-container">
        <div id="search-input-container">
          <SearchInput
            value={input}
            onChange={this.handleSearchInputChange}
            onEnter={this.handleSearch}
            isFetching={isFetching}
          />
        </div>
        <div id="search-results-container">
          <SearchResults
            results={results}
          />
        </div>

      </div>);
  }
}


SearchComponent.propTypes = {
  errors: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  results: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  isFetching: PropTypes.bool,
  input: PropTypes.string,
  inputChange: PropTypes.func,
  search: PropTypes.func,
};

SearchComponent.defaultProps = {
  errors: [],
  isFetching: false,
  results: [],
  input: '',
  inputChange: () => {},
  search: () => {},
};

const mapStateToProps = ({ search }) => ({
  errors: search.errors,
  isFetching: search.isFetching,
  results: search.results,
  input: search.input,
});


const mapDispatchToProps = dispatch => ({
  inputChange: input => dispatch(actions.searchInputChange(input)),
  search: (input) => {
    if (!input.length) return;
    dispatch(actions.searchRequest(input));
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
