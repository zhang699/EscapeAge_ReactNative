




import {REQUEST_STUDIOS, RECEIVE_STUDIOS, RECEIVE_STUDIO_TOGGLE_RESULT} from './studioActions';
import {toggleLike, wrapCollectionObjectsWithClassMethods, replaceToHttps} from '../utils/util';
import Studio from './studio';


function replaceStudiosPhotoUrlToHttps(studios){

	for (let studioId in studios){
		const studio = studios[studioId];
		studio.photoUrl = replaceToHttps(studio.photoUrl);
	}
}

function handleStudioLikeToggleResult(state, action) {
	const {studioId, isSub} = action;
	const studios = {...state.studios};
	const studio = Object.assign(new Studio(), studios[studioId]);

	studio.likes = toggleLike(isSub)(studio.likes);
	studios[studioId] = studio;

	return {
		...state,
		studios,
	}
}
function handleStudios(state={isLoading:true, studios:{}}, action){
	switch(action.type){
		case RECEIVE_STUDIOS:
			replaceStudiosPhotoUrlToHttps(action.studios);
			const studioModels = wrapCollectionObjectsWithClassMethods(action.studios, Studio);
			return Object.assign({}, state, {isLoading:false, studios:studioModels});
		case REQUEST_STUDIOS:
			return Object.assign({}, state, {isLoading:true});
		case RECEIVE_STUDIO_TOGGLE_RESULT:
			return handleStudioLikeToggleResult(state, action);
		default :
			return state;
	}

}

export {handleStudios}
