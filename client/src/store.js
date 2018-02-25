import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';


// Redux devtools compose
// This line allows the Redux DevTools usage
// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Initial state
const initialState = {
  auth: {
    username: '',
  },
};


export default function configureStore(iniState = initialState) {
  return createStore(
    rootReducer,
    iniState,
    composeEnhancers(applyMiddleware(thunk)),
  );
}
