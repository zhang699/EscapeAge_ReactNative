


import {REHYDRATE} from 'redux-persist/constants';
import {
  RECEIVE_SETTINGS_AREAS,
  RECEIVE_SETTINGS_SORT_ORDER_OF_GAME_LIST,
  RECEIVE_SETTINGS_SORT_ORDER_OF_STUDIO_LIST,
  RECEIVE_STUDIO_SETTING_AREAS,
} from './persistActions';

import {SORTING_GAME_BY_POPULARITY, SORTING_STUDIO_BY_POPULARITY} from '../presentation/sorting'
/**
{
  areas:[],
  gamelistSortType:<number>,
  studiolistSortType:<number>
}
*/
const INITIAL_STATE = {
  areas:[],
  gamelistSortType:SORTING_GAME_BY_POPULARITY,
  studiolistSortType:SORTING_STUDIO_BY_POPULARITY,
  studioAreas:[],
}
function handlePersist(state={}, action){

  switch (action.type) {
    case RECEIVE_SETTINGS_AREAS:
      return {
        ...state,
        areas:action.areas,
      }
    case RECEIVE_SETTINGS_SORT_ORDER_OF_GAME_LIST:
      return {
        ...state,
        gamelistSortType:action.order
      }
    case RECEIVE_SETTINGS_SORT_ORDER_OF_STUDIO_LIST:
      console.warn('RECEIVE_SETTINGS_SORT_ORDER_OF_STUDIO_LIST', action);
      return {
        ...state,
        studiolistSortType:action.order,
      }
    case RECEIVE_STUDIO_SETTING_AREAS:
      return {
        ...state,
        studioAreas:action.areas
      }
    case REHYDRATE:
      //console.warn('handlePersist.REHYDRATE', state, action);
      break;
    default:
  }
  return state;
}

export {
  handlePersist
}
