export const getValues = (state) => state.survey.values;
export const getStatus = (state) => state.survey.status;
export const getInputs = (state) => state.survey.inputs;
export const getErrors = (state) => state.survey.errors;

export const getIsValid = (state) => getStatus(state).isValid;
export const getIsSubmitted = (state) => getStatus(state).isSubmitted;
export const getIsSubmitting = (state) => getStatus(state).isSubmitting;
export const getSurveyID = (state) => getValues(state)?.surveyID;
export const getSurvey = (state) => getValues(state)?.survey;
export const getQuestions = (state) => getSurvey(state)?.questions;
export const getStats = (state) => getValues(state)?.stats;
export const getTotalStats = (state) => getStats(state)?.total;
export const getQuestion = (state, questionID) => getQuestions(state)?.[questionID];
export const getQuestionStats = (state, questionID) => getStats(state)?.[questionID];
export const getRating = (state, questionID) => getInputs(state)?.[questionID];
