
import {RECEIVE_GAME_LIKES, REQUEST_GAME_LIKES, RECEIVE_STUDIO_LIKES} from './likeActions'

function handleLikes(state={isLoading:true, studioLikes:[], gameLikes:[]}, action){
  switch(action.type){
    case RECEIVE_GAME_LIKES:
      return Object.assign({}, state, {isLoading:false, gameLikes:action.gameLikes});
    case RECEIVE_STUDIO_LIKES:
      return Object.assign({}, state, {isLoading:false, studioLikes:action.studioLikes});
    default :
      return state;
  }
}

export {handleLikes}
