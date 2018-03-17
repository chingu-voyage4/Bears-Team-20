import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import Music from '.';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Music />, div);
  ReactDOM.unmountComponentAtNode(div);
});