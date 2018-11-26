import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {connectRouter, routerMiddleware} from 'connected-react-router';
import {createBrowserHistory} from 'history';
import * as reducers from './reducers';
import {cancelSagas, startSagas} from './sagas';

let sagaMiddlewareOptions;
let storeCreator = createStore;
let middlewareComposer = compose;

/* istanbul ignore next */
if (__DEV__) {
  // lazy loading reactotron for performance
  // eslint-disable-next-line global-require
  const configureReactotron = require('./configureReactotron').default;
  const Reactotron = configureReactotron();
  const sagaMonitor = Reactotron.createSagaMonitor();

  storeCreator = Reactotron.createStore;
  sagaMiddlewareOptions = {sagaMonitor};
  middlewareComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware(sagaMiddlewareOptions);
const store = storeCreator(
  combineReducers({
    router: connectRouter(history),
    ...reducers
  }),
  middlewareComposer(
    applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware
    )
  )
);

startSagas(sagaMiddleware);

/* istanbul ignore next */
if (__DEV__ && module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers', () => {
    // eslint-disable-next-line no-console
    console.log('Reloading reducers');
    // eslint-disable-next-line global-require
    const nextRootReducer = require('./reducers');

    /* istanbul ignore next */
    store.replaceReducer(combineReducers({
      router: connectRouter(history),
      ...nextRootReducer
    }));
  });

  module.hot.accept('./sagas', () => {
    // eslint-disable-next-line no-console
    console.log('Reloading sagas');
    cancelSagas(store);
    // eslint-disable-next-line global-require
    require('./sagas').startSagas(sagaMiddleware);
  });
}

export {history};
export default store;
