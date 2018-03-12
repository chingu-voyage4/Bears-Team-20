import React from 'react';

import './Navbar.css';

const Navbar = () => (
  <nav>
    <h1 className="logo">Logo</h1>
    <ul>
      <li><a href="_blank"role="button">Home</a></li>
      <li><a href="_blank"role="button">Playlists</a></li>
      <li><a href="_blank"role="button">Login/Signout</a></li>
      <li><a href="_blank"role="button">Profile</a></li>
    </ul>
  </nav>
);

export default Navbar;
