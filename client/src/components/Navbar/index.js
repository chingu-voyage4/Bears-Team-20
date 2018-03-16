import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => (
  <nav>
    <h1 className="logo">Logo</h1>
    <ul>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/playlists">Playlists</NavLink></li>
      <li><NavLink to="/music">Music</NavLink></li>
      <li><NavLink to="/login">Login/Signout</NavLink></li>
      <li><NavLink to="/profile">Profile</NavLink></li>
    </ul>
  </nav>
);

export default Navbar;
