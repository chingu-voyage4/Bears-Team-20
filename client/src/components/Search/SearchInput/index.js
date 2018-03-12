import React from 'react';
import { Input } from 'material-ui';
import PropTypes from 'prop-types';


export default function SearchInput(props) {
  const { value, onChange, onEnter } = props;
  return (
    <div id="search-container">
      <Input
        placeholder="Search for music, artists or albums"
        fullWidth
        onChange={onChange}
        value={value}
        onKeyDown={(e) => {
          // Filter "Enter"
          if (e.keyCode === 13) onEnter();
        }}
      />
    </div>);
}


SearchInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onEnter: PropTypes.func,
};

SearchInput.defaultProps = {
  value: '',
  onChange: () => {},
  onEnter: () => {},
};

