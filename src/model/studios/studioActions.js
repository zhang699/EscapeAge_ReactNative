

export const REQUEST_STUDIOS='REQUEST_STUDIOS';
export const RECEIVE_STUDIOS='RECEIVE_STUDIOS';
export const RECEIVE_STUDIO_TOGGLE_RESULT='RECEIVE_STUDIO_TOGGLE_RESULT';
import {firebase, studioDbRef} from '../main';
import _ from 'lodash';
import {toggleLike} from '../utils/util';
import constants from '../constants'
function requestStudios(){
	return {
		type:REQUEST_STUDIOS
	}
}

function receiveStudios(studios) {
	return {
		type:RECEIVE_STUDIOS,
		studios
	}
}

function receiveToggleResult(studioId, isSub) {
	return {
		type:RECEIVE_STUDIO_TOGGLE_RESULT,
		studioId,
		isSub,
	}
}
function toggleStudioLikeOfStudioItem(studioId, isSub) {
	return (dispatch, getState)=>{
		return studioDbRef.child(studioId).child(constants.FIREBASE.KEY.LIKES)
		.transaction(toggleLike(isSub))
		.then(()=>{
			dispatch(receiveToggleResult(studioId, isSub));
		})
	}
}
function fetchStudios(){
	return (dispatch)=>{
		dispatch(requestStudios());
		/**return Promise object that useful for caller to concat next action by calling then() function. */
		return studioDbRef.once('value').then((snapshot) => {
  			const studioSnapshotObj = snapshot.val();
  			//console.warn('studioSnapshotObj', studioSnapshotObj);
  			dispatch(receiveStudios(studioSnapshotObj));
		}, (error)=>{
				console.warn('fetchStudios.error', error);
		});
	}
}

export {fetchStudios, toggleStudioLikeOfStudioItem};
