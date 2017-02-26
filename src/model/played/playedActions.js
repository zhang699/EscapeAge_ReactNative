

import {firebase, playedDbRef} from '../main';
import constants from '../constants';
import moment from 'moment'
import _ from 'lodash';
import {generateRandomId} from '../utils/util';

import {receiveUserPlayedItem, receiveCreateUserPlayedResult, receiveRemoveUserPlayedResult} from './actioncreators'


/**
[
  { commentPublic: false,
    gameId: 'HvlB6VscxL',
    id: 'JE3zkEx8j5',
    playedDate: 1471363200000,
    playedResult: 'success',
    rate: -1,
    userId: 'facebook:XX' }
]
*/
export function getPlayed(state, gameId){
  const {playeds} = state.playeds;
  let resultPlayed = null
  _.forIn(playeds, (played, playedId)=>{
    if (played.gameId === gameId){
      resultPlayed = played;
      return false;
    }
  })

  return resultPlayed;
}
export function createUserPlayedRecord(gameId, playedRecord){
  return function(dispatch, getState){

    const state = getState()
    const played = getPlayed(state, gameId);

    const {uid} = state.login.firebaseUser;
    const isNewPlayed = played == null;

    playedId = isNewPlayed ? generateRandomId(): played.id;
    //const playedDate = moment(playedRecord.date, constants.DATE.PICKER_DATE_FORMAT).valueOf() / 1000;
    playedDate = playedRecord.date;
    const displayRate = playedRecord.star ;
    const rate = displayRate * 2;

    const record = {
      id:playedId,
      gameId,
      rate,
      displayRate,
      userId:uid,
      playedResult:playedRecord.isEscapeSuccess ? 'success': 'failure',
      playedDate,
    }

    return playedDbRef.child(playedId).set(record)
    .then(()=>{
        dispatch(receiveCreateUserPlayedResult(record))
        return Promise.resolve(isNewPlayed)
    })
  }
}

function isAlreadyRequested(state){
	const {playeds} = state.playeds
	return Object.keys(playeds).length !== 0;
}

function askForPlayeds(dispatch, state){
  const {uid} = state.login.firebaseUser;
  return playedDbRef.orderByChild(constants.FIREBASE.KEY.USER_ID)
  .equalTo(uid).once('value').then((playedSnapshot)=>{

    const playeds = playedSnapshot.val();
    //console.warn('fetchUserPlayed.playeds', playeds);
    dispatch(receiveUserPlayedItem(playeds));
  }, (error)=>{

  });
}

function askForCachedPlayeds(state){
  const {playeds} = state.playeds;
  return Promise.resolve(playeds);
}

export function removeUserPlayedGame(userId, playedId) {
  return (dispatch, getState)=>{
    const state = getState();
    return playedDbRef.child(playedId).remove().then(()=>{
      dispatch(receiveRemoveUserPlayedResult(userId, playedId))
    })
  }
}
export function fetchUserPlayed(){
  return (dispatch, getState)=>{
    const state = getState();
    if (isAlreadyRequested(state)){
      return askForCachedPlayeds(state);
    }else {
      return askForPlayeds(dispatch, state);
    }
  }

}
