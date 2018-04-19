/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { deepPurple } from 'material-ui/colors';


const NavContainer = styled.nav`
  background-color: ${deepPurple[600]};
  padding:0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-shadow: 0px 1px 43px 1px rgba(0,0,0,0.3);
`;

const Logo = styled.div`
  color: white;
  user-select: none;
  font-size: 2em;
  padding: 0 0.2em;
  font-family: 'Pacifico', sans-serif;
`;

const NavEnd = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledNavLink = styled(NavLink)`
  font-size: 1.2em;
  text-decoration: none;
  color: white;
`;

const StyledNavLinkItem = styled(NavLinkItem)`
  display: flex;  
  align-items: center;
  justify-content: center; 
  padding: 0 0.5em; 
  cursor: pointer;
  text-shadow: 1px 1px 1px ${deepPurple[900]};

  &:hover {
    background-color: ${deepPurple[900]}
  }

  &:last-child {
    margin-right: 0.5em;
  }
`;

const Navbar = (props) => {
  const { user } = props;
  return (
    <NavContainer>
      <Logo>MusicHub</Logo>
      <NavEnd>
        <StyledNavLinkItem to="/">Home</StyledNavLinkItem>
        <StyledNavLinkItem to="/music">Music</StyledNavLinkItem>
        { user.isAuthenticated &&
          <StyledNavLinkItem to="/playlists">Playlists</StyledNavLinkItem>
        }

        <StyledNavLinkItem to={user.isAuthenticated ? '/profile' : '/login'}>
          { user.isAuthenticated ?
            'Profile'
            :
            'Login'
            }
        </StyledNavLinkItem>
        { user.isAuthenticated &&
          <StyledNavLinkItem to="/logout">Logout</StyledNavLinkItem>
        }

      </NavEnd>
    </NavContainer>
  );
};


function NavLinkItem(props) {
  return (
    <StyledNavLink to={props.to} className={props.className}>
      {props.children}
    </StyledNavLink>
  );
}

Navbar.propTypes = {
  user: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

Navbar.defaultProps = {
  user: {},
};

export default Navbar;
