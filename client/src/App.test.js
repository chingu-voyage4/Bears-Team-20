import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { AppComponent as App } from './App';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter>
    <App />
  </MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
