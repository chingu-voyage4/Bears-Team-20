import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import Landing from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('Landing Page Component',() => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
});
