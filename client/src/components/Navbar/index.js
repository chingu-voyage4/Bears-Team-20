import React from 'react';

import './Navbar.css';

const Navbar = () => (
  <nav>
    <h1 className="logo">Logo</h1>
    <ul>
      <li>Home</li>
      <li>Playlists</li>
      <li>Login/Signout</li>
      <li>Profile</li>
    </ul>
  </nav>
);

export default Navbar;
