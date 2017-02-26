
import {
  RECEIVE_USER_PLAYED_ITEM,
  RECEIVE_CREATE_USER_PLAYED_RESULT,
  RECEIVE_REMOVE_USER_PLAYED_RESULT} from './actiontypes';
import moment from 'moment';
import _ from 'lodash';

const DEFAULT_STATE = {
  escapeStat:{numOfSuccess:0,
              numOfAlreadyPlayeds:0,
              escapeRate:0},
  playeds:{},
  isLoading:true
}


function getDisplayedDate(played) {
  return moment(played.playedDate).format('YYYY MMM');
}
function calculateDisplayPlayedDate(playeds){

   const result = {}
   _.forIn(playeds, (played, playedId) => {

     const newPlayed =  {
       ...played,
       displayPlayedDate : getDisplayedDate(played),
     }
     if (newPlayed.rate > 0){
       newPlayed.displayRate = newPlayed.rate / 2;
     }
     result[playedId] = newPlayed;
   })

  return result;
}


function calculateEscapeStat(playeds){
  const numOfAlreadyPlayeds = Object.keys(playeds).length;
  //console.warn('numOfAlreadyPlayeds', numOfAlreadyPlayeds, playeds, typeof(playeds));
  const numOfSuccess = _.reduce(playeds, (sum, played) => {
    const isSuccess = played.playedResult === 'success';
    played.isSuccess = isSuccess; //feed isSuccess flag to played object whick make other easy to use.
    return isSuccess ? 1 + sum : sum;
  }, 0);


  const escapeRate = Math.round((numOfSuccess / numOfAlreadyPlayeds) * 100.0);
  const escapeStat = {
    numOfSuccess,
    numOfAlreadyPlayeds,
    escapeRate: escapeRate
  }
  return escapeStat;
}

function handleReceiveCreateUserPlayedResult(state, action){
  //console.warn('handleReceiveCreateUserPlayedResult.action', action);
  const playedResult = action.played;
  const played = {
    ...playedResult,
    displayPlayedDate: getDisplayedDate(playedResult)
  }
  const playeds = {...state.playeds};

  playeds[played.id] = played;
  console.warn('playeds', Object.keys(playeds).length);
  const escapeStat = calculateEscapeStat(playeds);
  return {
    ...state,
    playeds,
    escapeStat,
  };
}

function handleReceiveRemoveUserPlayedResult(state, action) {
  const playeds = {...state.playeds};
  delete playeds[action.playedId];
  const escapeStat = calculateEscapeStat(playeds);
  return {
    ...state,
    playeds,
    escapeStat
  }
}
function handlePlayeds(state=DEFAULT_STATE, action){
  switch(action.type){
    case RECEIVE_USER_PLAYED_ITEM:
      const playeds = calculateDisplayPlayedDate(action.playeds);
      const escapeStat = calculateEscapeStat(playeds);

      return {
        ...state,
        playeds,
        escapeStat,
        isLoading:false
      }
    case RECEIVE_CREATE_USER_PLAYED_RESULT:
      return handleReceiveCreateUserPlayedResult(state, action)
    case RECEIVE_REMOVE_USER_PLAYED_RESULT:
      return handleReceiveRemoveUserPlayedResult(state, action);
  }
  return state
}

export {handlePlayeds};
