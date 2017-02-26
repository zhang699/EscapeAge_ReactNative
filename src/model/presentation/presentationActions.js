
import {
  requestLikeList,
  receiveLikeList,
  requestGameList,
  receiveGameList,
  receiveStudioList,
  requestStudioList,
  requestUserPlayed,
  receiveUserPlayed,
  receiveGameListSearchResult,
  receiveGeolocationFromAddress,
  receiveGameListSortType,
  receiveStudioListSortType,
  receiveStudioListSearchResult,
  receiveToggleGameLikeResult,
  receiveGameDetailPage,
  requestGameDetailPage,
  receiveCreatePlayedRecordResult,
  receiveRemovePlayedGameResult,
  receiveGamesByStudioId,
  requestGamesByStudioId,
  receiveToggleStudioLikeResult,
  receiveStudioDetailPage,
  requestToggleStudioLike,
  requestToggleGameLike,
} from './actioncreators';

import {fetchGames, toggleGameLikeOfGameItem, toggleGamePlayedOfGameItem} from '../games/gameActions';
import {fetchStudios, toggleStudioLikeOfStudioItem} from '../studios/studioActions';
import {fetchGameLikes, fetchStudioLikes} from '../likes/likeActions';
import {fetchUserInfo, toggleGameLikeToUser, toggleStudioLikeToUser} from '../login/loginActions';
import {fetchUserPlayed, createUserPlayedRecord, removeUserPlayedGame} from '../played/playedActions';
import {replaceToHttps, toQueryGeocodeURL} from '../utils/util';
import {fetchGeolocation} from '../utils/maputil';
import constants from '../constants';
import _ from 'lodash';


function fetchGeoLocationFromAddress(address){
	return (dispatch, getState)=>{
		return fetchGeolocation(address).then(function (geolocation) {
      dispatch(receiveGeolocationFromAddress({
        longitude:geolocation.lng,
        latitude:geolocation.lat
      }));
		})
  }
}

function searchGameListByText(searchText){
	return (dispatch, getState)=>{

		if (isEmptySearch(searchText)){
			const {games} =  getState().games;
			dispatch(receiveGameListSearchResult('', false, games));

      const {persist} = getState();
      dispatch(sortGameListByType(persist.gamelistSortType));
		}else{
			return dispatch(receiveGameListSearchResult(searchText, true))
		}
	}
}
function isEmptySearch(searchText){
	return searchText === ''
}

function searchStudioListByText(searchText){
	return (dispatch, getState)=>{
		if (isEmptySearch(searchText)){
			const {studios} = getState().studios;
			dispatch(receiveStudioListSearchResult('', false, studios))

      const {persist} = getState();
      dispatch(sortStudioListByType(persist.studiolistSortType));
		}else{
			return dispatch(receiveStudioListSearchResult(searchText, true));
		}
	}
}
function sortGameListByType(type){
	return (dispatch, getState)=>{
    const {persist} = getState();
		return dispatch(receiveGameListSortType(type, persist.areas));
	}
}
function sortStudioListByType(type){
	return (dispatch, getState)=>{
    const {persist} = getState();
		return dispatch(receiveStudioListSortType(type, persist.studioAreas))
	}
}

function fetchUserPlayedRecord(){
	return (dispatch, getState)=>{
		dispatch(requestUserPlayed());
		const fetchTasks = [dispatch(fetchGameList()), dispatch(fetchUserPlayed())]
		return Promise.all(fetchTasks).then(()=>{
			 const state = getState();
			 const {playeds} = state.playeds;
			 const {games} = state.games;

			 dispatch(receiveUserPlayed(games, playeds))
		})
	}
}

function fetchStudioList(){

	return (dispatch, getState)=>{


		dispatch(requestStudioList())
		dispatch(fetchStudios())
		.then(()=>{
			const state = getState();
			const {studios} = state.studios;
			const {studiolistSortType} = state.persist;
			dispatch(receiveStudioList(studios));
			dispatch(sortStudioListByType(studiolistSortType))
		})
	}
}

function fetchGameList(){
	return (dispatch, getState)=>{
		dispatch(requestGameList());
		return dispatch(fetchGames())
			 .then(()=>{
				return dispatch(fetchStudios())
			}).then(()=>{
        return dispatch(fetchUserPlayed())
      }).then(()=>{
          const state = getState();
          const {games} = state.games;
          const {studios} = state.studios;
          const {playeds} = state.playeds;
          const {gamelistSortType} = state.persist;

				//console.warn('fetchGameList.gameList', gameList);

				 dispatch(receiveGameList(games, studios, playeds));
				 dispatch(sortGameListByType(gamelistSortType));
			});
	}
}
function fetchLikeList(){
	return (dispatch, getState)=>{
		let state = getState();
		//console.warn('state.login', state.login.firebaseUser);
		return dispatch(fetchUserInfo(state.login.firebaseUser.uid))
		.then(()=>{
			//console.warn('start fetch like list')
			dispatch(requestLikeList());
			const fetchLikeTasks = [dispatch(fetchGameLikes()), dispatch(fetchStudioLikes())];
			return Promise.all(fetchLikeTasks)
			.then(()=>{
				//fetch the new state that come with updated userInfo which contains updated gameLikeIds and studioLikeIds
				state = getState();
				const {gameLikes, studioLikes} = state.likes;

				dispatch(receiveLikeList(gameLikes, studioLikes));
			});
		})
	}
}

function fetchGameDetailPage(game){
	return function(dispatch, getState){
		dispatch(requestGameDetailPage());
		const state = getState();
		const studio = game.studioObj;
		const address = game.address || studio.address

    var userPlayedRecordTask = dispatch(fetchUserPlayedRecord());
    var geoLocationTask = dispatch(fetchGeoLocationFromAddress(address));

    Promise.all([userPlayedRecordTask, geoLocationTask])
		.then(()=>{
      const state = getState();
      const {playeds} = state.playeds;
      console.warn('state.login', state.login);
			dispatch(receiveGameDetailPage(game, state.login.userInfo, playeds));
		})
	}
}

function toggleGameLike(gameId){
	return function(dispatch, getState){
    dispatch(requestToggleGameLike());
		const state = getState();
		const {userInfo} = state.login;
		const {gameDetail} = state.presentation.gameDetailPage
		const isSub = userInfo[constants.FIREBASE.KEY.GAME_LIKES].indexOf(gameId) >= 0;
		const toggleTasks = [
      dispatch(toggleGameLikeToUser(gameId, isSub)),
			dispatch(toggleGameLikeOfGameItem(gameId, isSub))
    ]
		return Promise.all(toggleTasks)
			.then(()=>{
				dispatch(receiveToggleGameLikeResult(gameId, isSub));
        dispatch(fetchGameList());
			})

	}
}

function toggleStudioLike(studioId) {
  return function (dispatch, getState) {
    const state = getState();
    const {userInfo} = state.login;
    const studioLikes = userInfo[constants.FIREBASE.KEY.STUDIO_LIKES]
    const isSub = studioLikes.indexOf(studioId) >= 0;
    //console.warn('toggleStuioLike', studioId, isSub, studioLikes);
    dispatch(requestToggleStudioLike());
    const toggleTasks = [
      dispatch(toggleStudioLikeToUser(studioId, isSub)),
      dispatch(toggleStudioLikeOfStudioItem(studioId, isSub)),
    ]
    return Promise.all(toggleTasks)
    .then(()=>{
      const {studios} = getState().studios;
      const studio = studios[studioId];
      dispatch(fetchStudioDetailPage(studio))
      dispatch(receiveToggleStudioLikeResult(studioId, isSub))
    })
  }
}
function createPlayedRecord(gameId, playedRecord){
  return function(dispatch, getState){

    return dispatch(createUserPlayedRecord(gameId, playedRecord))
    .then((isNewPlayed)=>{
      if (isNewPlayed){
        return dispatch(toggleGamePlayedOfGameItem(gameId, false))
      }
    }).then(()=>{
      const state = getState();
      const {playeds} = state.playeds;
      const {game} = state.presentation.gameDetailPage;
      dispatch(receiveCreatePlayedRecordResult(playeds, game));
      //return dispatch(fetchGameList());
      return dispatch(fetchUserPlayedRecord())
    })
  }
}

function removePlayedGame(playedGame) {
  return function (dispatch, getState) {
    const state = getState();
    const {id, gameId} = playedGame;
    const {uid} = state.login.firebaseUser;
    const removePlayedTask = [
      dispatch(removeUserPlayedGame(uid, id)),
      dispatch(toggleGamePlayedOfGameItem(gameId, true))
    ]
    return Promise.all(removePlayedTask).then(()=>{
      dispatch(receiveRemovePlayedGameResult(id));
      dispatch(fetchGameList()); //refetch game list again
    })
  }
}

function fetchStudioDetailPage(studio) {
  return function (dispatch, getState) {
    const state = getState();
    const studioLikes = state.login.userInfo[constants.FIREBASE.KEY.STUDIO_LIKES];
    dispatch(receiveStudioDetailPage(studio, studioLikes));
  }
}
function fetchGamesByStudioId(studioId) {

  return function (dispatch, getState) {
    dispatch(requestGamesByStudioId());
    const state = getState();
    const games = state.games.games;
    const gamesByStudioId = _.pickBy(games, (game)=>{
      return game.studioId === studioId
    })
    dispatch(receiveGamesByStudioId(gamesByStudioId));
  }
}
export {
	fetchGameList,
	fetchStudioList,
	fetchLikeList,
	fetchUserPlayedRecord,
	fetchGeoLocationFromAddress,
	searchGameListByText,
	searchStudioListByText,
	sortGameListByType,
	sortStudioListByType,
	fetchGameDetailPage,
  fetchStudioDetailPage,
	toggleGameLike,
  toggleStudioLike,
  createPlayedRecord,
  removePlayedGame,
  fetchGamesByStudioId,
};
