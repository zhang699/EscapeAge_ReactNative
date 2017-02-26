

export const REQUEST_GAMES='REQUEST_GAMES';
export const RECEIVE_GAMES='RECEIVE_GAMES';
export const RECEIVE_TOGGLE_OF_GAME_ITEM='RECEIVE_TOGGLE_OF_GAME_ITEM';
export const RECEIVE_TOGGLE_PLAYED_RESULT='RECEIVE_TOGGLE_PLAYED_RESULT';
import {firebase, gameDbRef} from '../main';
import _ from 'lodash';
import constants from '../constants';
import {toggleLike, togglePlayed} from '../utils/util';
function requestGames(){
	return {
		type:REQUEST_GAMES
	}
}

function receiveGames(games) {
	return {
		type:RECEIVE_GAMES,
		games
	}
}

function isAlreadyRequested(state){
	const {games} = state.games
	return Object.keys(games).length !== 0;
}

function askForGames(dispatch){
	return gameDbRef.once('value').then((snapshot) => {
			const gameSnapshotObj = snapshot.val();
			return dispatch(receiveGames(gameSnapshotObj));
	});
}

function askForCachedGames(state){
	return Promise.resolve(state.games.games);
}
function fetchGames(){
	return (dispatch, getState)=>{
		const state = getState();
		dispatch(requestGames());
		if (!isAlreadyRequested(state)){
			return askForGames(dispatch)
		}else{
			return askForCachedGames(state);
		}
	}
}

function receiveToggleResult(gameId, isSub){
	return {
		type:RECEIVE_TOGGLE_OF_GAME_ITEM,
		gameId,
		isSub
	}
}
function receiveTogglePlayedResult(gameId, isSub) {
	return {
		type:RECEIVE_TOGGLE_PLAYED_RESULT,
		gameId,
		isSub,
	}
}

function fetchGamesByStudioId(studioId){
	return (dispatch) =>{
		dispatch(requestGamesByStudioId());
		return gameDbRef.orderByChild(Constants.FIREBASE.KEY.STUDIO_ID)
		.equalTo(studioId).once('value').then((gameByStudioId)=>{
			  const games = gameByStudioId.val();
				dispatch(receiveGamesByStudioId(games));
		})
	}
}

const toggleGameLikeOfGameItem = (gameId, isSub) => (dispatch, getState)=>{
	return gameDbRef.child(gameId).child(constants.FIREBASE.KEY.LIKES).
	transaction(toggleLike(isSub)).then(()=>{
		dispatch(receiveToggleResult(gameId, isSub))
	})
}
const toggleGamePlayedOfGameItem = (gameId, isSub) => (dispatch, getState)=>{
	return gameDbRef.child(gameId).child(constants.FIREBASE.KEY.PLAYEDS)
	.transaction(togglePlayed(isSub)).then(()=>{
		dispatch(receiveTogglePlayedResult(gameId, isSub))
	})
}

export {fetchGames, toggleGameLikeOfGameItem, toggleGamePlayedOfGameItem}
