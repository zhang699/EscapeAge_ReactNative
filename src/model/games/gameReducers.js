




import {REQUEST_GAMES, RECEIVE_GAMES, RECEIVE_TOGGLE_OF_GAME_ITEM, RECEIVE_TOGGLE_PLAYED_RESULT} from './gameActions';
import Constants  from '../constants';
import moment from 'moment';
import {toggleLike, togglePlayed, replaceToHttps, wrapCollectionObjectsWithClassMethods} from '../utils/util';
import Game from './game';
import _ from 'lodash';
/**GameItem,
Qp7oLmUS': { area: 'area_tp',
           booking: 'https://goo.gl/A5FyCI',
           gameTime: '90',
           id: '6IQp7oLmUS',
           introduction: '<h5>「我要做一件大事...，等著看吧.....」</h5>\n連續無頭殺人案，出現了模仿事件。為了阻止「先知」造成P市的恐慌，玩家將化身為特殊民警組織－「<strong><font color="#00CCFF">賽伯洛斯</font></strong>」，危機一觸即發，行動吧，獵犬們！<br /><br /><em class="_4ay8">▶ </em>行動推理劇場，邊移動邊推理 <br /> <em class="_4ay8">▶ </em>鎖定+調查+追捕三大要素<br /> <em class="_4ay8">▶ </em>限時追緝，激發你的大腦與行動的極限<br /> <em class="_4ay8">▶ </em>推理案情，預測下一步，逮捕犯人',
           likes: 1,
           limit: '6-10',
           name: '全面對決',
           nameQuery: '全面對決',
           photoUrl: 'https://i.imgur.com/L9ohS4J.jpg',
           playeds: 2,
           rate: 10,
           status: '8_160701', //6_Opened
           studioId: 't5DTGafUaC',
           timetable: '',
           views: 84,
           vote: 1,
           website: '',
           youtube: 'https://goo.gl/xbrvQ7',
*/
function calculateIsNewStatusOfGame(status){
		const stateAndDate = status.split('_');
		if (stateAndDate.length !== 2){
			 console.warn('Invalid status', stateAndDate);
			 return false;
		}
		const state = stateAndDate[0];
		const date = stateAndDate[1];

		const isNew = state === Constants.GAME_STATUS.TAG_NEW ||
		state === Constants.GAME_STATUS.TAG_ABOUT_TO_OPEN;
	  if (isNew){
			 const now = moment();
			 const gameOpenDate = moment(date, 'YYMMDD');
			 gameOpenDate.add(Constants.NEW_GAME_PERIOD_IN_MONTHS, 'months')
			 const isOld = now.isAfter (gameOpenDate);
			 return !isOld;
		}else{
			return false;
		}
}

function calculateClosed(game) {
	const {status} = game;
	const isStartWithTagClosed = status.indexOf(Constants.GAME_STATUS.TAG_CLOSED) === 0;
	const containWithUnderScore = status.indexOf('_') >= 0;
	const isClosed = status !== undefined && isStartWithTagClosed && containWithUnderScore;
	return isClosed;
}

function calculateIsAboutToOpen(game) {
	const {status, date} = game;
	const isStartWithTagAboutToOpened = status.indexOf(Constants.GAME_STATUS.TAG_ABOUT_TO_OPEN) === 0;
	const containWithUnderScore = status.indexOf('_') >= 0;
	if (isStartWithTagAboutToOpened && containWithUnderScore){
		const now = moment();
		const gameOpenDate = moment(date, 'YYMMDD');
		return now.isAfter(gameOpenDate);
	}
	return false;
}
function calculateStatusOfGames(games){
	_.forIn(games, (game, prop)=>{
		game.isNew = calculateIsNewStatusOfGame(game.status);
		game.isClosed = calculateClosed(game);
		game.isAboutToOpen = calculateIsAboutToOpen(game);
	})
}

function replaceGamePhotoUrlToHttps(gameSnapshotObj){
	for (let gameId in gameSnapshotObj){
		let game = gameSnapshotObj[gameId];
		game.photoUrl = replaceToHttps(game.photoUrl);
	}
}

function handleReceiveToggleOfGameItem(state, action){
	const {gameId, isSub} = action;
	const games = {...state.games}
	const game = Object.assign(new Game(), games[gameId]);

	game.likes = toggleLike(isSub)(game.likes);
	games[gameId] = game;
	//return Object.assign({}, state, {game:games});
	return {
		...state,
		games
	}
}

function handleReceiveToggleOfPlayedResult(state, action) {
	const {gameId, isSub} = action;
	const games = {...state.games};
	const game = Object.assign(new Game(), games[gameId]);

	game.playeds = togglePlayed(isSub)(game.playeds);
	games[gameId] = game;

	return {
		...state,
		games,
	}
}
function handleGames(state={isLoading:true, games:{}}, action){
	switch(action.type){
		case RECEIVE_GAMES:


			const gameModel = wrapCollectionObjectsWithClassMethods(action.games, Game);
			/*return Object.assign({}, state, {isLoading:false, games:gameModel});*/
			replaceGamePhotoUrlToHttps(gameModel)
			calculateStatusOfGames(gameModel);

			return {
				...state,
				isLoading:false,
				games : gameModel,
			}
		case REQUEST_GAMES:
			return {
				...state,
				isLoading:true,
			}
		case RECEIVE_TOGGLE_OF_GAME_ITEM:
			return handleReceiveToggleOfGameItem(state, action)
		case RECEIVE_TOGGLE_PLAYED_RESULT:
			return handleReceiveToggleOfPlayedResult(state, action);
		default :
			return state;
	}

}

export {handleGames}
