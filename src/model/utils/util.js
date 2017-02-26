

const GOOGLE_API_SITE = "https://maps.googleapis.com/maps/api/geocode/json?";
import config from '../../config/development';
export function replaceToHttps(string){
	return string.replace('http://', 'https://')
}

export function replaceArrToHttps(arr, prop){
		return arr.map((e)=>{
			e[prop] = replaceToHttps(e[prop]);
			return e;
		})
}

export function wrapCollectionObjectsWithClassMethods(collection, ClassName){
	const results = {}
	for (let prop in collection){
		const element = collection[prop]
		const elementModel = Object.assign(new ClassName(), element);
		results[prop] = elementModel;
	}
	return results;
}

export function toQueryGeocodeURL(address){
	const googleHttpAPIKey = config.googleServiceKey;
	console.warn('google http api key is ', googleHttpAPIKey);
	return `${GOOGLE_API_SITE}address=${address}&key=${googleHttpAPIKey}`
}


function toggleCounter(isSub, counter) {
	if (counter == null){
		return 0;
	}else {
		return isSub ? counter -1 : counter +1;
	}
}

export function toggleLike(isSub){
	return function(like){
		return toggleCounter(isSub, like);
	}
}
export function togglePlayed(isSub) {
	return function (played) {
		return toggleCounter(isSub, played);
	}
}

export function generateRandomId() {
	const ID_LENGTH = 10;
	let text = "";
	const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (let i = 0; i < ID_LENGTH; i++) {
		 let pos = Math.floor(Math.random() * possible.length);
		 text += possible.charAt(pos);
	}

	return text;
}

export function toggleArrayItems(isSub, item){
	return (likes)=>{
		//console.warn('gameLikes inside transaction', gameLikes);
		if (!isSub){
			if (!likes){
				return [item];
			}
			likes.push(item)
			return likes;
		}else{
			_.remove(likes, (likeItem)=>{
				return likeItem == item;
			})
			return likes;
		}
	}
}
