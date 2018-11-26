import {combineReducers} from 'redux';
import {setStateKey, deleteStateKey, clearState} from '../stateHelpers';
import TYPES from './types';

const DEFAULT_STATUS = {
  isValid: false,
  isSubmitted: false,
  isSubmitting: false
};
const DEFAULT_ERRORS = {};
const DEFAULT_VALUES = {};
const DEFAULT_INPUTS = {};

export const statusReducer = (state = DEFAULT_STATUS, {type, payload}) => {
  switch (type) {
  case TYPES.VALIDATE:
    return setStateKey(state, 'isValid', payload.isValid);
  case TYPES.SUBMITTED:
    return setStateKey(state, 'isSubmitted', payload.isSubmitted);
  case TYPES.SUBMITTING:
    return setStateKey(state, 'isSubmitting', payload.isSubmitting);
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
  case TYPES.REQUEST_SURVEY:
    return setStateKey(state, 'surveyID', payload.surveyID);
  case TYPES.LOAD_SURVEY:
    return setStateKey(state, 'survey', payload);
  case TYPES.SYNC_STATS:
    return setStateKey(state, 'stats', payload);
  case TYPES.SYNC_RESPONSES:
    if (__DEV__) {
      // store full response list only in dev mode, fallthrough to default otherwise
      return setStateKey(state, 'responses', payload);
    }
  // eslint-disable-next-line no-fallthrough
  default:
    return state;
  }
};

export const inputsReducer = (state = DEFAULT_INPUTS, {type, payload}) => {
  switch (type) {
  case TYPES.ADD_RATING:
    return setStateKey(state, payload.questionID, payload.rating);
  case TYPES.LOAD_RESPONSE:
    return payload;
  default:
    return state;
  }
};

export default combineReducers({
  status: statusReducer,
  errors: errorsReducer,
  values: valuesReducer,
  inputs: inputsReducer
});
