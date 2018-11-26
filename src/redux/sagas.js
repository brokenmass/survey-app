import {fork, take, cancel, all} from 'redux-saga/effects';
import appSagas from './app/sagas';
import surveySagas from './survey/sagas';

const CANCEL_SAGAS_HMR = 'CANCEL_SAGAS_HMR';

const sagas = function *sagas () {
  yield all([
    fork(surveySagas),
    fork(appSagas)
  ]);
};

export const startSagas = (sagaMiddleware) => {
  if (__DEV__) {
    const abortableSagas = function *abortableSagas () {
      yield fork(sagas);
      // the root abortableSagas fork the application sage and then
      // 'waits' for a CANCEL_SAGAS_HMR action before self-cancelling
      yield take(CANCEL_SAGAS_HMR);
      yield cancel();
    };

    sagaMiddleware.run(abortableSagas);
  } else {
    sagaMiddleware.run(sagas);
  }
};

export const cancelSagas = (store) => {
  store.dispatch({
    type: CANCEL_SAGAS_HMR
  });
};

export default sagas;
