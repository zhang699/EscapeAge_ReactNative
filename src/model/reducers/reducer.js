
import {combineReducers} from 'redux';
import {handleGames} from '../games/gameReducers';
import {login} from '../login/loginReducers';
import {handleStudios} from '../studios/studioReducers';
import {refreshPresentation} from '../presentation/presentationReducers';
import {handleLikes} from '../likes/likeReducers';
import {handlePlayeds} from '../played/playedReducers'
import {handlePersist} from '../persist/persistReducers';

export default combineReducers({
	'games' : handleGames,
	'login' : login,
	'studios' : handleStudios,
	'likes' : handleLikes,
	'presentation' : refreshPresentation,
	'playeds' : handlePlayeds,
	'persist' : handlePersist,
});
