import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => (
  <nav>
    <h1 className="logo">Logo</h1>
    <ul>
      <li><Link to="/home">Home</Link></li>
      <li><Link to="/playlists">Playlists</Link></li>
      <li><Link to="/music">Music</Link></li>
      <li><Link to="/login">Login/Signout</Link></li>
      <li><Link to="/profile">Profile</Link></li>
    </ul>
  </nav>
);

export default Navbar;
