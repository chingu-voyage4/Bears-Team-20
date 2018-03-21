import React from 'react';
import { Input, InputAdornment, IconButton } from 'material-ui';
import { Search } from 'material-ui-icons';
import PropTypes from 'prop-types';
import './SearchInput.css';


export default class SearchInput extends React.Component {
  componentDidMount() {
    this.refInput.focus();
  }

  render() {
    const {
      value, onChange, onEnter, isFetching,
    } = this.props;
    return (
      <div id="search-container">
        <Input
          inputRef={(refInput) => { this.refInput = refInput; }}
          placeholder="Search for music, artists or albums"
          id="search-input"
          fullWidth
          onChange={onChange}
          value={value}
          onKeyDown={(e) => {
            // Filter "Enter"
            if (e.keyCode === 13) onEnter();
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="Search"
                color={isFetching ? 'default' : 'primary'}
                onClick={onEnter}
              >
                <Search />
              </IconButton>
            </InputAdornment>}
        />
      </div>
    );
  }
}


SearchInput.propTypes = {
  value: PropTypes.string,
  isFetching: PropTypes.bool,
  onChange: PropTypes.func,
  onEnter: PropTypes.func,
};

SearchInput.defaultProps = {
  value: '',
  isFetching: false,
  onChange: () => {},
  onEnter: () => {},
};

