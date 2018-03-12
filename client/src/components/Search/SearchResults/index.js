import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ResultItem from './ResultItem';


export default class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.handleStuff = this.handleStuff.bind(this);
  }

  handleStuff() {
    const { results } = this.props;
    console.log(results);
  }

  render() {
    const { results } = this.props;
    return (
      <div>
        {results.map(result => <ResultItem key={result.title} result={result} />)}
      </div>);
  }
}


SearchResults.propTypes = {
  results: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

SearchResults.defaultProps = {
  results: [],
};

