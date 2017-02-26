
import {LOGIN_FB, RECEIVE_FIREBASE_USER, RECEIVE_USER_INFO,
  RECEIVE_TOGGLE_GAME_LIKE_RESULT_TO_USER, RECEIVE_TOGGLE_STUDIO_LIKE_RESULT_TO_USER} from './loginActions';
import constants from '../constants';
import _ from 'lodash';
/** attribute of firebaseUser
{
  uid:'facebook:test',
  photoURL:'null',
  providerData:[{
      uid:'test',
      displayName:'your display name in facebook',
      photoURL:'your avatar in facebook',
      providerId:'facebook.com'
  }]
}
**/
const INITIAL_STATE = {
  firebaseUser : {},
  userType : '',
  userInfo : {
  }
}
function extractProviderData(firebaseUser){
  return firebaseUser.providerData[0]
}

function handleReceiveToggleToStudioLike (state, action) {
  const {studioId, isSub} = action;
  const userInfo = {...state.userInfo};
  const studioLikes = userInfo[constants.FIREBASE.KEY.STUDIO_LIKES];
  toggleList(studioLikes, studioId, isSub);
  return {
    ...state,
    userInfo
  }
}

function toggleList(list, id, isSub) {
  if (!isSub){
    list.push(id)
  }else {
    _.remove(list, (item)=>{
      return item === id;
    })
  }
}
function handleReceiveToggleToGameLike(state, action){
  const userInfo = Object.assign({}, state.userInfo);
  const gameLikes = userInfo[constants.FIREBASE.KEY.GAME_LIKES];
  if (!action.isSub){
      gameLikes.push(action.gameId)
  }else {
      _.remove(gameLikes, (item)=>{
        return item === action.gameId;
      })
  }
  //console.warn('loginstate', userInfo);
  return Object.assign({}, state, {userInfo});
}
function login(state={} , action) {

  switch(action.type){
  	case RECEIVE_FIREBASE_USER:
      const { firebaseUser, userType } = action;
  		return {
        ...state,
        userType,
        firebaseUser,
        providerData : extractProviderData(firebaseUser)
      }
    case RECEIVE_USER_INFO:
      const { userInfo } = action;
      console.warn('receive user info', userInfo);
      const gameLikes = action.userInfo[constants.FIREBASE.KEY.GAME_LIKES];
      const studioLikes = action.userInfo[constants.FIREBASE.KEY.STUDIO_LIKES];
      const newsRead = action.userInfo[constants.FIREBASE.KEY.NEWS_READ];
      return Object.assign({}, state, {
        userInfo : {
          ...action.userInfo,
          [constants.FIREBASE.KEY.GAME_LIKES] : gameLikes ? gameLikes : [],
          [constants.FIREBASE.KEY.STUDIO_LIKES] : studioLikes ? studioLikes : [],
          [constants.FIREBASE.KEY.NEWS_READ] : newsRead ? newsRead : [],
        }
      })
    case RECEIVE_TOGGLE_GAME_LIKE_RESULT_TO_USER:
      return handleReceiveToggleToGameLike(state, action);
    case RECEIVE_TOGGLE_STUDIO_LIKE_RESULT_TO_USER:
      return handleReceiveToggleToStudioLike(state, action);
  }

  return state
}

export {login};
