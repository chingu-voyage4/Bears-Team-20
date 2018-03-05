/* eslint-disable global-require */
import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();

  /* eslint-disable no-underscore-dangle */
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(
      sagaMiddleware,
      logger,
    )),
  );
    /* eslint-enable */

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      /* eslint-disable global-require */
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  sagaMiddleware.run(rootSaga);
  return store;
}
