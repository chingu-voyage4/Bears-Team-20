import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: props.results,
    };
  }

  render() {
    const { results } = this.state;
    return (
      <div>
        RESULTS!!
        {results}
      </div>);
  }
}


SearchResults.propTypes = {
  results: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

SearchResults.defaultProps = {
  results: [],
};

