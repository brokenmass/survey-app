import {delay} from 'redux-saga';
import {call, put, takeLatest} from 'redux-saga/effects';
import {rsf} from '../../firebase';
import TYPES from './types';
import {login, loading, setError, resetError} from './actions';

export const initApp = function *() {
  yield put(loading(true));

  let success = true;

  do {
    success = true;
    yield put(resetError({field: 'login'}));
    try {
      const user = yield call(rsf.auth.signInAnonymously);

      yield put(login(user.user));
    } catch (error) {
      success = false;
      yield put(setError({
        field: 'login',
        error: {
          title: 'Login Error',
          message: error.message + '\nRetrying...'
        }
      }));
      // wait 5s before retrying
      yield call(delay, 5000);
    }
  } while (!success);

  yield put(loading(false));
};

export default function *() {
  yield takeLatest(TYPES.START, initApp);
}
