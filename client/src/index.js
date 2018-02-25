import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import configureStore from './store';

import registerServiceWorker from './registerServiceWorker';

import App from './App';

const store = configureStore(); // no param default to initial state


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
