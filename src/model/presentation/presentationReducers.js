import _ from 'lodash';

import {REQUEST_GAME_LIST,
	RECEIVE_GAME_LIST,
	REQUEST_STUDIO_LIST,
	RECEIVE_STUDIO_LIST,
	REQUEST_LIKE_LIST,
	RECEIVE_LIKE_LIST,
	REQUEST_USER_PLAYED,
	RECEIVE_GEOLOCATION_FROM_ADDRESS,
	RECEIVE_USER_PLAYED,
	RECEIVE_GAME_LIST_SEARCH_RESULT,
	RECEIVE_GAME_LIST_SORT_TYPE,
	RECEIVE_STUDIO_LIST_SORT_TYPE,
	RECEIVE_STUDIO_LIST_SEARCH_RESULT,
	RECEIVE_GAME_DETAIL_PAGE,
	REQUEST_GAME_DETAIL_PAGE,
	RECEIVE_TOGGLE_GAME_LIKE_RESULT,
	RECEIVE_CREATE_PLAYED_RECORD_RESULT,
	RECEIVE_REMOVE_PLAYED_GAME_RESULT,
	REQUEST_GAMES_BY_STUDIO_ID,
	RECEIVE_GAMES_BY_STUDIO_ID,
	RECEIVE_TOGGLE_STUDIO_LIKE_RESULT,
	RECEIVE_STUDIO_DETAIL_PAGE,
	REQUEST_TOGGLE_STUDIO_LIKE,
	REQUEST_TOGGLE_GAME_LIKE,
} from './actiontypes';
import constants from '../constants';
import {sortGameList, sortStudioList} from './sorting';
import {toggleLike} from '../utils/util';

/** whole attributes inside state of presentation
presentation:{
	gameLikes:[],
	studioLikes:[].
	gameList:[],
	studioList:[],
	studios:[],
	playeds:[],
	isLoading
}
*/
const ZOOM_LEVEL = 0.002

const INITIAL_STATE = {
	isLoading:true,
	gameDetailPage:{
		geolocation:{latitude:0, longitude:0, longitudeDelta:ZOOM_LEVEL, latitudeDelta:ZOOM_LEVEL},
		/*likes : {}*/
		game:{}
	},
	studioDetailPage:{
		isExecutingRequest:false,
		studio:{},
	},
	playeds:{},
	gameLikes:{},
	studioLikes:{},
	gameList:{},
	studioList:{},
	gamesByStudioId:[],
};
function raiseLoading(state){
	return Object.assign({}, state, {isLoading:true});
}
function getGameListSearchFilter(action){
	return (game)=>{
		const searchText = action.searchText;
		const isStudioMatched = game.studioObj.name.includes(searchText);
		const isGameMatched = game.name.includes(searchText);
		return isStudioMatched || isGameMatched;
	}
}

function getStudioListSearchFilter(action){
	return (studio)=>{
		const searchText = action.searchText;
		const isStudioMatched = studio.name.includes(searchText);
		return isStudioMatched;
	}
}
function filterEntitySearchResult(entities, action, filter){
	if (action.isFilter){
		return _.filter(entities, filter);
	}else{
		return _.values(action.restoreResult);
	}
}
function filterGameSearchResult(games, action){
	return filterEntitySearchResult(games, action, getGameListSearchFilter(action));
}

function filterStudioSearchResult(studioList, action){
	return filterEntitySearchResult(studioList, action, getStudioListSearchFilter(action));
}

function addGameToPlayedItem(games, playeds){
  const mapPlayeds = _.map(playeds, (played)=>{
		 const newPlayed = {...played};
     const gameId = newPlayed.gameId
     const game = {...games[gameId]};
     newPlayed.game = game;
     return newPlayed;
  })
  return mapPlayeds
}

function acquireGameList(action){
	const {games, studios, playeds} = action;
	const gameList = [];
	//console.warn('acquireGameList.games', games);
	//
	_.forIn(games, (game, gameId)=>{
		const studio = studios[game.studioId];
		game.studioObj = studio;
		game.isUserPlayed = false;
		game.playedId = undefined;
		gameList.push(game);
	})

	_.forIn(playeds, (played, playedId)=>{
		const {gameId} = played;
		const game = games[gameId];
		if (game !== undefined){
			game.isUserPlayed = true;
			game.playedId = playedId;
		}else{
			console.warn('cannot find game id', gameId);
		}
	})



	return gameList;
}

function handleToggleGameLikeResult(state, action){

	const gameDetailPage = {
		...state.gameDetailPage,
		game : {
			...state.gameDetailPage.game
		}
	}
	const {game} = gameDetailPage;

	game.likes = toggleLike(action.isSub)(game.likes);

	gameDetailPage.isExecutingRequest = false;
	return {
		...state,
		gameDetailPage,
	}
}

function findPlayedByGameId(playeds, gameId){
	return _.find(playeds, {gameId});
}

function handleStudioDetailPage(state, action) {
	const {studioLikes} = action;
	const studio = {...action.studio};
	studio.isUserLiked = studioLikes != null && studioLikes.indexOf(studio.id) >= 0;
	const studioDetailPage = {
		studio,
		isLoading:false
	}
	return {
		...state,
		studioDetailPage,
	}
}
function handleGameDetailPage(state, action){
	const geolocation = {...state.gameDetailPage.geolocation,
		longitudeDelta:ZOOM_LEVEL, latitudeDelta:ZOOM_LEVEL}

	const game = {...action.game};

	const { userInfo } = action;
	const gameLikes = userInfo[constants.FIREBASE.KEY.GAME_LIKES];

	game.isUserLiked = gameLikes != null && gameLikes.indexOf(game.id) >= 0 ;

	game.played = findPlayedByGameId(action.playeds, game.id);
	//game.played.game = null;
	//console.warn('handleGameDetailPage', game.played, action.playeds, game.id);
	const gameDetailPage = {
		geolocation,
		game,
		isLoading:false
	}

	/*return Object.assign({}, state, {isLoading:false, gameDetailPage});*/
	return {
		...state,
		isLoading:false,
		gameDetailPage,
	}
}

function handleReceiveCreatePlayedRecordResult(state, action){
	const game = {...action.game};
	game.played = findPlayedByGameId(action.playeds, game.id);

	const gameDetailPage = {
		...state.gameDetailPage,
		game,
	}

	return {
		...state,
		gameDetailPage,
	};
}

function handleReceiveRemovePlayedGameResult(state, action) {
	const {playedId} = action;
	const playeds = [...state.playeds];
	//console.warn('remove id ', playedId);

	_.remove(playeds, function (played) {
		//console.warn('played.id', played.id);
		return played.id === playedId;
	})

	return {...state, playeds};
}

function handleReceiveGamesByStudioId(state, action) {
	const {gamesByStudioId} = action;

	return {
		...state,
		gamesByStudioId
	}
}

function handleReceiveStudioLikeResult(state, action) {
	const studioDetailPage = {...state.studioDetailPage};
	studioDetailPage.isExecutingRequest = false;
	return {
		...state,
		studioDetailPage,
	}
}

function handleRequestToggleStudio(state, action) {
	//console.warn('handleRequestToggleStudio');
	const studioDetailPage = {...state.studioDetailPage}
	studioDetailPage.isExecutingRequest = true;
	return {
		...state,
		studioDetailPage,
	}
}

function handleRequestToggleGameLike(state, action) {
	const gameDetailPage = {...state.gameDetailPage}
	gameDetailPage.isExecutingRequest = true;
	return {
		...state,
		gameDetailPage
	}
}
function refreshPresentation(state=INITIAL_STATE, action){
	switch(action.type){
		case REQUEST_GAME_LIST:
		case REQUEST_STUDIO_LIST:
		case REQUEST_LIKE_LIST:
			return raiseLoading(state);
		case RECEIVE_GAME_LIST:
			const result = acquireGameList(action);
			return Object.assign({}, state, {isLoading:false, gameList:result});
		case RECEIVE_STUDIO_LIST:
			const studioList = _.values(action.studioList)
			return Object.assign({}, state, {isLoading:false, studioList});
		case RECEIVE_LIKE_LIST:
			//console.warn('RECEIVE_LIKE_LIST', action);
			return Object.assign({}, state, {isLoading:false, studioLikes:action.studiolikes, gameLikes:action.gamelikes});
		case RECEIVE_USER_PLAYED:
		  const playeds = addGameToPlayedItem(action.games, action.playeds)
			return Object.assign({}, state, {isLoading:false, playeds})
		case RECEIVE_GEOLOCATION_FROM_ADDRESS:
			return Object.assign({}, state, {gameDetailPage:{geolocation:action.geolocation}})
		case RECEIVE_GAME_LIST_SEARCH_RESULT:
			return Object.assign({}, state, {isLoading:false, gameList:filterGameSearchResult(state.gameList, action)})
		case RECEIVE_STUDIO_LIST_SEARCH_RESULT:
			return Object.assign({}, state, {isLoading:false, studioList:filterStudioSearchResult(state.studioList, action)})
		case RECEIVE_GAME_LIST_SORT_TYPE:
			const gameList = sortGameList(state.gameList, action.sortedArea, action.sortType);
			return Object.assign({}, state, {isLoading:false, gameList})
		case RECEIVE_STUDIO_LIST_SORT_TYPE:
			const sortedStudioList = sortStudioList(state.studioList, action.sortedArea, action.sortType)
			return Object.assign({}, state, {isLoading:false, studioList:sortedStudioList})
		case REQUEST_GAME_DETAIL_PAGE:
			return Object.assign({}, state, {isLoading:true});
		case RECEIVE_GAME_DETAIL_PAGE:
			return handleGameDetailPage(state, action);
		case RECEIVE_STUDIO_DETAIL_PAGE:
			return handleStudioDetailPage(state, action);
		case RECEIVE_TOGGLE_GAME_LIKE_RESULT:
			return handleToggleGameLikeResult(state, action);
		case RECEIVE_CREATE_PLAYED_RECORD_RESULT:
			return handleReceiveCreatePlayedRecordResult(state, action);
		case RECEIVE_REMOVE_PLAYED_GAME_RESULT:
			return handleReceiveRemovePlayedGameResult(state, action);
		case RECEIVE_GAMES_BY_STUDIO_ID:
			return handleReceiveGamesByStudioId(state, action);
		case RECEIVE_TOGGLE_STUDIO_LIKE_RESULT:
			return handleReceiveStudioLikeResult(state, action);
		case REQUEST_TOGGLE_STUDIO_LIKE:
			return handleRequestToggleStudio(state, action);
		case REQUEST_TOGGLE_GAME_LIKE:
			return handleRequestToggleGameLike(state, action);
		default :
			return state;
	}

}

export {refreshPresentation}
