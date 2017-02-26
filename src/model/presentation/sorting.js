


import Area from '../utils/areas';


export const SORTING_GAME_BY_POPULARITY = 0;
export const SORTING_GAME_BY_STUDIO_NAME = 1;
export const SORTING_GAME_BY_GAME_NAME = 2;

export const SORTING_STUDIO_BY_POPULARITY = 0;
export const SORTING_STUDIO_BY_STUDIO_NAME = 1;

const SORTING_GAME_COMPARTOR = {
	[SORTING_GAME_BY_POPULARITY] : (area, game1, game2)=>{

		return compareByOrders([
			compareOrderOfGameArea,
			compareOrderOfGameNew,
			compareOrderOfGamePopularity
		])
		function compareOrderOfGameArea(){
			return area.compareArea(game1.area, game2.area);
		}
		function compareOrderOfGameNew(){
			if (game1.isNew && !game2.isNew){
				return -1
			}else if (!game1.isNew && game2.isNew){
				return 1
			}else if (game1.isNew && game2.isNew){
				return compareOrderByValue(game1.isAboutToOpen, game2.isAboutToOpen);
			}else{
				return compareOrderByValue(game1.isClosed, game2.isClosed)
			}
		}
		function compareOrderOfGamePopularity(){
			return compareEntityPopularity(game1, game2)
		}
		function compareOrderOfGameStatus(){
			return compareGameStatusThenPopularity(game1, game2);
		}
	},
	[SORTING_GAME_BY_STUDIO_NAME]:(area, game1, game2)=>{
		const studio1 = game1.getStudio();
		const studio2 = game2.getStudio();

		return compareByOrders([
			compareOrderOfGameArea,
			compareOrderOfStudioPopularity,
			compareOrderOfStudioName,
			compareOrderOfGameStatus])

		function compareOrderOfGameArea(){
			return area.compareArea(game1.area, game2.area);
		}
		function compareOrderOfStudioPopularity(){
			return compareStudioPopularity(studio1, studio2);
		}
		function compareOrderOfStudioName(){
			return compareEntityName(studio1, studio2);
		}
		function compareOrderOfGameStatus(){
			return compareGameStatusThenPopularity(game1, game2);
		}
	},
	[SORTING_GAME_BY_GAME_NAME] : (area, game1, game2)=>{

		return compareByOrders([
			compareOrderOfGameArea,
			compareOrderOfStudioName,
			compareOrderOfGameStatus]);

		function compareOrderOfGameArea(){
			return area.compareArea(game1.area, game2.area);
		}
		function compareOrderOfStudioName(){
			return compareEntityName(game1, game2);
		}
		function compareOrderOfGameStatus(){
			return compareGameStatusThenPopularity(game1, game2);
		}
	},
}

const SORTING_STUDIO_COMPARTOR = {
	[SORTING_STUDIO_BY_POPULARITY] : (area, studio1, studio2)=>{

		return compareByOrders([
			compareOrderOfStudioArea,
			compareOrderOfStudioPopularity])

		function compareOrderOfStudioArea(){
			return area.compareArea(studio1.area, studio2.area);
		}

		function compareOrderOfStudioPopularity(){
			return compareEntityPopularity(studio1, studio2);
		}
	},
	[SORTING_STUDIO_BY_STUDIO_NAME] : (area, studio1, studio2)=>{


		return compareByOrders([
			compareOrderOfStudioArea,
			compareOrderOfStudioName,
			compareOrderOfStudioPopularity
		])
		function compareOrderOfStudioArea(){
			return area.compareArea(studio1.area, studio2.area);
		}

		function compareOrderOfStudioName(){
			return compareEntityName(studio1, studio2);
		}

		function compareOrderOfStudioPopularity(){
			return compareEntityPopularity(studio1, studio2);
		}

		return 0;
	}
}

function compareStudioPopularity(studio1, studio2){
	 return studio2.getPopularity() - studio1.getPopularity()
}
function compareEntityName(entity1, entity2){
	return entity1.name.localeCompare(entity2.name);
}
function compareEntityPopularity(entity1, entity2){
	return entity2.getPopularity() - entity1.getPopularity();
}
function compareGameStatusThenPopularity(game1, game2){
	if (game1.isNew){
		return -1;
	} else if (game1.isClosed || game2.isNew){
		return 1;
	}else {
		const sortGamePopularity = compareEntityPopularity(game1, game2)
		return sortGamePopularity;
	}
}

function compareByOrders(orders){
	for (let i=0;i<orders.length;i++){
		const order = orders[i];
		const result = order();
		if (result !== 0){
			return result;
		}
	}
	return 0;
}


function compareOrderByValue(value1, value2){
	value1 = value1 ? 1 : 0;
	value2 = value2 ? 1 : 0;
	return value1 - value2;
}
export function sortStudioList(studioList, sortedArea, sortType=SORTING_STUDIO_BY_POPULARITY){
	//console.warn('SORTING_STUDIO_COMPARTOR', sortType);
	const sortComparator = SORTING_STUDIO_COMPARTOR[sortType];
	const area = new Area(sortedArea);
	studioList.sort(sortComparator.bind(this, area));
	return studioList;
}
export function sortGameList(gameList, sortedArea, sortType=SORTING_GAME_BY_POPULARITY){
	//console.warn('SORTING_GAME_COMPARTOR', sortType);
	const sortComparator = SORTING_GAME_COMPARTOR[sortType];
	const area = new Area(sortedArea);
	gameList.sort(sortComparator.bind(this, area));
	return gameList;
}
