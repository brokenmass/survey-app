import firebase from 'firebase';
import ReduxSagaFirebase from 'redux-saga-firebase';
import config from './config';

const fireBaseApp = firebase.initializeApp(config);

const rsf = new ReduxSagaFirebase(fireBaseApp);

export {fireBaseApp, rsf};
