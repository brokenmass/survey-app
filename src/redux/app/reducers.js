import {combineReducers} from 'redux';
import {setStateKey, deleteStateKey, clearState} from '../stateHelpers';
import TYPES from './types';

const DEFAULT_STATUS = {
  isLoading: false
};
const DEFAULT_ERRORS = {};
const DEFAULT_VALUES = {
  landingPath: '/'
};

export const statusReducer = (state = DEFAULT_STATUS, {type, payload}) => {
  switch (type) {
  case TYPES.LOADING:
    return setStateKey(state, 'isLoading', payload.isLoading);
  default:
    return state;
  }
};
export const errorsReducer = (state = DEFAULT_ERRORS, {type, payload}) => {
  switch (type) {
  case TYPES.SET_ERROR:
    return setStateKey(state, payload.field, payload.error);
  case TYPES.RESET_ERROR:
    return deleteStateKey(state, payload.field);
  case TYPES.RESET_ALL_ERRORS:
    return clearState(state);
  default:
    return state;
  }
};
export const valuesReducer = (state = DEFAULT_VALUES, {type, payload}) => {
  switch (type) {
  case TYPES.LOGIN:
    return setStateKey(state, 'user', payload.user);
  case TYPES.SET_LANDING_PATH:
    return setStateKey(state, 'landingPath', payload.landingPath);
  case TYPES.LOGOUT:
    return deleteStateKey(state, 'user');
  default:
    return state;
  }
};

export default combineReducers({
  status: statusReducer,
  errors: errorsReducer,
  values: valuesReducer
});
