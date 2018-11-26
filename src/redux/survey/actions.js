import TYPES from './types';

export const valid = (isValid) => ({
  payload: {
    isValid
  },
  type: TYPES.VALIDATE
});
export const submitted = (isSubmitted) => ({
  payload: {
    isSubmitted
  },
  type: TYPES.SUBMITTED
});
export const submitting = (isSubmitting) => ({
  payload: {
    isSubmitting
  },
  type: TYPES.SUBMITTING
});
export const requestSurvey = (surveyID) => ({
  payload: {
    surveyID
  },
  type: TYPES.REQUEST_SURVEY
});
export const loadSurvey = (survey) => ({
  payload: survey,
  type: TYPES.LOAD_SURVEY
});

export const addRating = ({questionID, rating}) => ({
  payload: {
    questionID,
    rating
  },
  type: TYPES.ADD_RATING
});

export const loadResponse = (response) => ({
  type: TYPES.LOAD_RESPONSE,
  payload: response
});
export const saveResponse = () => ({
  type: TYPES.SAVE_RESPONSE
});

export const syncResponses = (responses) => ({
  type: TYPES.SYNC_RESPONSES,
  payload: responses
});
export const syncStats = (stats) => ({
  type: TYPES.SYNC_STATS,
  payload: stats
});

export const setError = ({field, error}) => ({
  payload: {
    field,
    error
  },
  type: TYPES.SET_ERROR
});

export const resetError = ({field}) => ({
  payload: {
    field
  },
  type: TYPES.RESET_ERROR
});

export const resetAllErrors = () => ({
  type: TYPES.RESET_ALL_ERRORS
});
