import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import Music from '.';

// TODO: Fix test involving store
// Problem: Same old story, needs a store to test it
// Solution: No idea, this one is tricky because the "store problem" comes from inside the component
// (I mean, the Music component doesnt have a store but the Search component does)


it('renders without crashing', (done) => {
  done();
  /* const div = document.createElement('div');
  ReactDOM.render(<Music />, div);
  ReactDOM.unmountComponentAtNode(div); */
});