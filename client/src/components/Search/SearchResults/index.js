/* eslint no-bitwise: ["error", { "allow": ["<<", "|="] }] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ResultItem from './ResultItem';


function generateKey(title, index) {
  const pre = `${title}_${index}_${Date.now()}`;
  let hash = 0;
  let i;
  let chr;
  if (pre.length === 0) return hash;
  for (i = 0; i < pre.length; i += 1) {
    chr = pre.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}


export default class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.handleStuff = this.handleStuff.bind(this);
  }

  handleStuff() {
    const { results, isFetching } = this.props;
    console.log(results, isFetching);
  }

  render() {
    const { results, playSong } = this.props;

    return (
      <div>
        {results.map((r, i) =>
          <ResultItem key={generateKey(r.title, i)} result={r} playSong={playSong} />)}
      </div>);
  }
}


SearchResults.propTypes = {
  results: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  isFetching: PropTypes.bool,
  playSong: PropTypes.func,
};

SearchResults.defaultProps = {
  results: [],
  isFetching: false,
  playSong: () => {},
};

