
import escapeApp from './reducers/reducer'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import {persistStore, autoRehydrate} from 'redux-persist';
import {AsyncStorage} from 'react-native'
import constants from './constants'
import * as firebase from 'firebase';
import config from '../config';
import {initializeStorage} from '../storage';
const loggerMiddleware = createLogger()

const store = createStore(escapeApp, applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    /*loggerMiddleware // neat middleware that logs actions*/
  ),
  autoRehydrate()
);

const persistor = initializeStorage(store, persistStore);
//persistor.purge();
/**Initialize firebase*/
const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  databaseURL: config.databaseURL,
  storageBucket: config.storageBucket
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const storageRef = firebase.storage().ref();
//const gameRef = storageRef.child(constants.FIREBASE.SITE_SUB_GAME);

const gameDbRef = firebase.database().ref(constants.FIREBASE.SITE_SUB_GAME);
const studioDbRef = firebase.database().ref(constants.FIREBASE.SITE_SUB_STUDIO);
const userDbRef = firebase.database().ref(constants.FIREBASE.SITE_SUB_USER);
const playedDbRef = firebase.database().ref(constants.FIREBASE.SITE_SUB_PLAYED);
export {
  store,
  firebaseApp,
  firebase,
  gameDbRef,
  studioDbRef,
  userDbRef,
  playedDbRef,
};
