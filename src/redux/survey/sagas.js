import {delay} from 'redux-saga';
import {call, put, takeLatest, select, fork} from 'redux-saga/effects';
import {rsf} from '../../firebase';
import {getUserID} from '../app/selectors';
import {loading} from '../app/actions';
import TYPES from './types';
import {valid, submitting, loadSurvey, syncResponses, syncStats, loadResponse, submitted, resetError, resetAllErrors, setError} from './actions';
import {getSurveyID, getQuestions, getInputs} from './selectors';

// generate an object with keys from 1 to 5 with value 0;
// eslint-disable-next-line no-sequences
const createEmptyOccurences = () => new Array(5).fill().reduce((map, _, index) => (map[index + 1] = 0, map), {});

// the following should be moved to firebase cloud function
export const generateStats = function *({payload}) {
  if (!payload) {
    return;
  }
  const questions = yield select(getQuestions);
  const questionIDs = Object.keys(questions || {});

  const responses = Object.values(payload);
  const stats = {
    total: {
      userCount: responses.length,
      occurrences: createEmptyOccurences(),
      average: 0
    }
  };

  questionIDs.forEach((qID) => {
    stats[qID] = {
      occurrences: createEmptyOccurences(),
      average: 0
    };

    responses.forEach((response) => {
      const rating = response[qID] || 0;

      stats[qID].average = rating / (questionIDs.length * responses.length);
      stats[qID].occurrences[rating]++;
      stats.total.average = rating / (questionIDs.length * responses.length);
      stats.total.occurrences[rating]++;
    });

    // calculate standard deviation defined as:
    // the square root of the mean value of the squares of the differences between every value and the mean value of the population)
    const sumDeltaSquared = Object.entries(stats[qID].occurrences)
      .reduce((sum, [rating, count]) => sum + count * (rating - stats[qID].average) ** 2 / responses.length, 0);

    stats[qID].standardDeviation = Math.sqrt(sumDeltaSquared);
  });

  yield put(syncStats(stats));
};

export const saveResponse = function *() {
  const userID = yield select(getUserID);
  const surveyID = yield select(getSurveyID);
  const response = yield select(getInputs);

  yield put(resetError({field: 'submit'}));
  yield put(submitting(true));
  try {
    yield call(rsf.database.update, `/surveys/${surveyID}/responses/${userID}`, response);
    yield put(submitted(true));
  } catch (error) {
    yield put(setError({
      field: 'submit',
      error: {
        title: 'Submit error',
        message: error.message
      }
    }));
    yield call(delay, 5000);
    yield put(resetError({field: 'submit'}));
  } finally {
    yield put(submitting(false));
  }
};

export const requestSurvey = function *() {
  const userID = yield select(getUserID);
  const surveyID = yield select(getSurveyID);

  yield put(resetAllErrors());
  yield put(loading(true));
  try {
    const survey = yield call(rsf.database.read, `/surveys/${surveyID}`);

    if (!survey) {
      throw new Error('Invalid surveyID');
    }
    yield put(loadSurvey({
      title: survey.title,
      questions: survey.questions
    }));
    yield put(syncResponses(survey.responses));

    if (survey.responses && survey.responses[userID]) {
      yield put(loadResponse(survey.responses[userID]));
      yield put(submitted(true));
    }
  } catch (error) {
    yield put(setError({
      field: 'request',
      error: {
        title: 'Request error',
        message: error.message
      }
    }));
  } finally {
    yield put(loading(false));
  }

  yield fork(
    rsf.database.sync,
    `/surveys/${surveyID}/responses`,
    {successActionCreator: syncResponses}
  );
};

export const validate = function *() {
  const questions = yield select(getQuestions);
  const response = yield select(getInputs);
  const questionIDs = Object.keys(questions || {});

  const isValid = questionIDs.every((questionID) => Boolean(response[questionID]));

  yield put(valid(isValid));
};

export default function *() {
  yield takeLatest(TYPES.ADD_RATING, validate);
  yield takeLatest(TYPES.REQUEST_SURVEY, requestSurvey);
  yield takeLatest(TYPES.SAVE_RESPONSE, saveResponse);
  yield takeLatest(TYPES.SYNC_RESPONSES, generateStats);
}
