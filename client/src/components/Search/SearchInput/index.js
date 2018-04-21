import React from 'react';
import { Input, InputAdornment, IconButton } from 'material-ui';
import { Search } from 'material-ui-icons';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { deepPurple } from 'material-ui/colors';


const SearchContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;

const StyledInput = styled(Input)`
  padding: 0 1em;
`;

const StyledInputAdornment = styled(InputAdornment)`
  padding-right: 1em !important;

  &:hover {
    background-color: ${deepPurple[100]}
  }
`;

export default class SearchInput extends React.Component {
  componentDidMount() {
    this.refInput.focus();
  }

  render() {
    const {
      value, onChange, onEnter, isFetching,
    } = this.props;
    return (
      <SearchContainer>
        <StyledInput
          inputRef={(refInput) => { this.refInput = refInput; }}
          placeholder="Search for music, artists or albums"
          fullWidth
          onChange={onChange}
          value={value}
          onKeyDown={(e) => {
            // Filter "Enter"
            if (e.keyCode === 13) onEnter();
          }}
          endAdornment={
            <StyledInputAdornment position="end">
              <IconButton
                aria-label="Search"
                color={isFetching ? 'default' : 'primary'}
                onClick={onEnter}
              >
                <Search />
              </IconButton>
            </StyledInputAdornment>}
        />
      </SearchContainer>
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

