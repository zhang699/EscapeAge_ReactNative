

export const RECEIVE_SETTINGS_AREAS = 'RECEIVE_SETTINGS_AREAS';
export const RECEIVE_STUDIO_SETTING_AREAS='RECEIVE_STUDIO_SETTING_AREAS';
export const RECEIVE_SETTINGS_SORT_ORDER_OF_GAME_LIST = 'RECEIVE_SETTINGS_SORT_ORDER_OF_GAME_LIST';
export const RECEIVE_SETTINGS_SORT_ORDER_OF_STUDIO_LIST = 'RECEIVE_SETTINGS_SORT_ORDER_OF_STUDIO_LIST';

function receiveSettingAreas(areas){
  return {
    type:RECEIVE_SETTINGS_AREAS,
    areas
  }
}

function receiveStudioSettingAreas(areas) {
  return {
    type:RECEIVE_STUDIO_SETTING_AREAS,
    areas,
  }
}

function receiveSettingListSortOrder(type, order){
  return {
    type,
    order
  }
}
function persistAreas(areas){
  return function(dispatch){
    dispatch(receiveSettingAreas(areas))
  }
}

function persistSortOrder(type, order){
  return function(dispatch){
    dispatch(receiveSettingListSortOrder(type, order))
  }
}
const persistGameListSortOrder = (order) => (dispatch) => {
  /*dispatch(receiveSettingListSortOrder(RECEIVE_SETTINGS_SORT_ORDER_OF_GAME_LIST, order))*/
  dispatch(persistSortOrder(RECEIVE_SETTINGS_SORT_ORDER_OF_GAME_LIST, order));
}

const persistStudioListSortOrder = (order) => (dispatch) =>{
  dispatch(persistSortOrder(RECEIVE_SETTINGS_SORT_ORDER_OF_STUDIO_LIST, order));
}

const persistStudioSortAreas = (areas) => (dispatch) =>{
  dispatch(receiveStudioSettingAreas(areas));
}
export {
  persistAreas,
  persistStudioSortAreas,
  persistGameListSortOrder,
  persistStudioListSortOrder,
}
