import 'typeface-roboto/index.css';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';

import App from './App';

// Initial state
const initialState = {
};


const store = configureStore(initialState); // no param default to initial state


render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
