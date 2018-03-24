import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Navbar.css';

const Navbar = (props) => {
  const { user } = props;
  return (
    <nav>
      <h1 className="logo">Logo</h1>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/music">Music</NavLink></li>
        <li><NavLink to="/playlists">Playlists</NavLink></li>
        <li>
          <NavLink to={user.isAuthenticated ? '/profile' : '/login'}>
            { user.isAuthenticated ?
            user.username
            :
            'Login'
            }
          </NavLink>
        </li>
        { user.isAuthenticated &&
          <li><NavLink to="/logout">Logout</NavLink></li>
        }

      </ul>
    </nav>
  );
};


Navbar.propTypes = {
  user: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

Navbar.defaultProps = {
  user: {},
};

export default Navbar;
