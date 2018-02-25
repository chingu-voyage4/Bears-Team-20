import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import configureStore from './store/configureStore';

import registerServiceWorker from './registerServiceWorker';

import App from './App';


// Initial state
const initialState = {
  auth: {
    username: '',
  },
};


const store = configureStore(initialState); // no param default to initial state


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
