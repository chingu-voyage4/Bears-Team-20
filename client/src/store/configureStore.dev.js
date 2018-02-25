import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware, { END } from 'redux-saga';
import rootReducer from '../reducers';


// Redux devtools compose
// This line allows the Redux DevTools usage
// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export default function configureStore(initialState) {
    const sagaMiddleware = createSagaMiddleware()
    
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(
            sagaMiddleware,
            logger
        )
    );
    
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default
            store.replaceReducer(nextRootReducer)
        })
    }
    store.runSaga = sagaMiddleware.run
    store.close = () => store.dispatch(END)
    return store
}