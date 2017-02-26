

export const REQUEST_GAME_LIKES='REQUEST_GAME_LIKES';
export const RECEIVE_GAME_LIKES='RECEIVE_GAME_LIKES';

export const REQUEST_STUDIO_LIKES='REQUEST_STUDIO_LIKES';
export const RECEIVE_STUDIO_LIKES='RECEIVE_STUDIO_LIKES';

import {firebase, gameDbRef, studioDbRef} from '../main';
import _ from 'lodash';
import {replaceArrToHttps} from '../utils/util';
import {fetchGames} from '../games/gameActions';
import {fetchStudios} from '../studios/studioActions';
function requestGameLikes(){
	return {
		type:REQUEST_GAME_LIKES
	}
}
function receiveGameLikes(gameLikes){
	return {
		type: RECEIVE_GAME_LIKES,
		gameLikes
	}
}
function requestStudioLikes(){
	return {
		type:REQUEST_STUDIO_LIKES
	}
}

function receiveStudioLikes(studioLikes){
	return {
		type:RECEIVE_STUDIO_LIKES,
		studioLikes
	}
}

function collectObjectByIds(rootObj, ids){
	let collectedObjs = [];
	if (ids && ids.length !== 0){
		collectedObjs = _.map(ids, (value, index)=>{
			return rootObj[value];
		})
	}
	return collectedObjs;
}


function getPropFromUserInfo(state, prop, initalValue){
	const {userInfo} = state.login
	return userInfo ? userInfo[prop] : initalValue;
}
function fetchGameLikes(){
	return (dispatch, getState)=>{
		//console.warn('fetchGameLikes');
		dispatch(requestGameLikes());
		dispatch(fetchGames()).then(()=>{
			const state = getState();
			const {games} = state.games
			const gameLikeIds = getPropFromUserInfo(getState(), 'game_likes', []);
			let gameLikes = collectObjectByIds(games, gameLikeIds);
			gameLikes = replaceArrToHttps(gameLikes, 'photoUrl');
			//console.warn('gameLikes', gameLikes);
			dispatch(receiveGameLikes(gameLikes));
			return Promise.resolve();
		})
		/*eturn gameDbRef.once('value').then((snapshot) => {
  			const gameSnapshotObj = snapshot.val();
				const gameLikeIds = getPropFromUserInfo(getState(), 'game_likes');
				let gameLikes = collectObjectByIds(gameSnapshotObj, gameLikeIds);
				gameLikes = replaceArrToHttps(gameLikes, 'photoUrl');
				//console.warn('gameLikes', gameLikes);
  			dispatch(receiveGameLikes(gameLikes));
				return Promise.resolve();
		}, (error)=>{
				console.warn('fetchGameLikes.error', error);
				return Promise.reject(error);
		});*/

	}
}

function fetchStudioLikes(){
	return (dispatch, getState)=>{
		dispatch(requestStudioLikes())
		return dispatch(fetchStudios()).then(()=>{
			const {studios} = getState().studios;
			const studioLikeIds = getPropFromUserInfo(getState(), 'studio_likes', []);
			const studioLikes = collectObjectByIds(studios, studioLikeIds);

			dispatch(receiveStudioLikes(studioLikes));
			//console.warn('fetchStudioLikes.done', studioLikes);
		})
	}
}
export {fetchGameLikes, fetchStudioLikes}
