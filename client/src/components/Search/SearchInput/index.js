import React from 'react';
import { Input } from 'material-ui';
import PropTypes from 'prop-types';


export default function SearchInput(props) {
  const { value, onChange } = props;
  return (
    <div id="search-container">
      <Input
        placeholder="Search for music, artists or albums"
        fullWidth
        onChange={onChange}
        value={value}
      />
    </div>);
}


SearchInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

SearchInput.defaultProps = {
  value: '',
  onChange: () => {},
};

