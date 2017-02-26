/*
 * action types
 */


import {firebase, userDbRef} from '../main';
import constants from '../constants';
import {toggleArrayItems} from '../utils/util';
export const LOGIN_FB = 'LOGIN_FB'

export const RECEIVE_FIREBASE_USER= 'RECEIVE_FIREBASE_USER'
export const ERROR_RECEIVE_FIREBASE_USER = 'ERROR_RECEIVE_FIREBASE_USER';
export const REQUEST_USER_INFO='REQUEST_USER_INFO';
export const RECEIVE_USER_INFO='RECEIVE_USER_INFO';
export const RECEIVE_TOGGLE_GAME_LIKE_RESULT_TO_USER = 'RECEIVE_TOGGLE_GAME_LIKE_RESULT_TO_USER';
export const RECEIVE_TOGGLE_STUDIO_LIKE_RESULT_TO_USER = 'RECEIVE_TOGGLE_STUDIO_LIKE_RESULT_TO_USER';

export const LOGIN = {
	GOOGLE: 'google',
	FB: 'facebook',
	FIREBASE: 'password'
};

function receiveFirebaseUser(firebaseUser, userType){
	return {
		type:RECEIVE_FIREBASE_USER,
		firebaseUser,
		userType
	}
}

function receiveFirebaseUserError(error) {
	return {
		type:ERROR_RECEIVE_FIREBASE_USER,
		error
	}
}
function requestUserInfo(){
	return {
		type:REQUEST_USER_INFO
	}
}
function receiveUserInfo(userInfo){
	return {
		type:RECEIVE_USER_INFO,
		userInfo
	}
}

function receiveToggleGameLikeResult(gameId, isSub){
	return {
		type:RECEIVE_TOGGLE_GAME_LIKE_RESULT_TO_USER,
		gameId,
		isSub
	}
}

function receiveToggleStudioLikeResult(studioId, isSub) {
	return {
		type: RECEIVE_TOGGLE_STUDIO_LIKE_RESULT_TO_USER,
		studioId,
		isSub,
	}
}

function signOutFirebase(){
	return (dispatch, getState)=>{
		return firebase.auth().signOut().then(function() {
		  // Sign-out successful.
		  console.warn('signout ok');
		}, function(error) {
		  console.warn('signout error', error)
		});
	}
}
function fetchUserInfo(userId){
	return (dispatch, getState)=>{
		dispatch(requestUserInfo());
		//.warn('start to fetch user info', userId);
		const userRef = userDbRef.child(userId);
		let userInfo = null;
		return userRef.once('value').then((userSnapshot)=>{
				//console.warn('userInfo', );
			const userInfo = userSnapshot.val();
			return Promise.resolve(userInfo)
		}).then((userInfo)=>{
			if (!userInfo){
				const {firebaseUser, userType, providerData} = getState().login;
				const newUserInfo = {
					account_type : userType,
					email: providerData.email,
					id: firebaseUser.uid,
					name: providerData.displayName,
					photo : providerData.photoURL,
				}
				return userRef.update(newUserInfo)
				.then(()=>{
					return Promise.resolve(newUserInfo);
				})
			} else {
				dispatch(receiveUserInfo(userInfo));
				return Promise.resolve();
			}
		}).then((newUserInfo)=>{
			 if (newUserInfo){
				 dispatch(receiveUserInfo(newUserInfo));
			 }
		})
	}
}


function chainReceiveFetchUserInfo(dispatch, firebaseUser, userType){
	dispatch(receiveFirebaseUser(firebaseUser, userType))
	return dispatch(fetchUserInfo(firebaseUser.uid));
}

function normalizeAuthResponse(user, type){
	const normalizeResponse = {};
	if (type === LOGIN.GOOGLE){
		normalizeResponse.token = user.idToken;
		normalizeResponse.provider= 'GoogleAuthProvider';
	}else if (type === LOGIN.FB) {
		normalizeResponse.token = user.credentials.token;
		normalizeResponse.provider= 'FacebookAuthProvider';
	}
	return normalizeResponse;
}
//type is fb, google or firebase
function signInFirebase(user, userType) {
	console.warn('login user is ', user, userType);
	const authResponse = normalizeAuthResponse(user, userType);
	const {token, provider} = authResponse;
  return (dispatch)=>{
		const onAuthPromise = (resolve, reject)=>{
			var unsubscribe = firebase.auth().onAuthStateChanged(checkUserLogin);
			function checkUserLogin(firebaseUser){
					unsubscribe()
					console.warn('authStateChanged.firebaseUser', firebaseUser);

					if (firebaseUser === null) {
								let credential = firebase.auth[provider].credential(token);
								const siginInPromise = firebase.auth().signInWithCredential(credential);
								return siginInPromise.then((firebaseUser)=>{
										console.warn('signIn.firebaseUser', firebaseUser);
										return chainReceiveFetchUserInfo(dispatch, firebaseUser, userType)
										.then(()=>{
												return resolve();
										});
								}).catch((error)=>{
										// Handle Errors here.
										console.warn('Sigin in with credential error', error);
										let errorCode = error.code;
										let errorMessage = error.message;
										// The email of the user's account used.
										let email = error.email;
										// The firebase.auth.AuthCredential type that was used.
										let credential = error.credential;

										dispatch(receiveFirebaseUserError(error))
										return reject();
								});
					}else{
							return chainReceiveFetchUserInfo(dispatch, firebaseUser, userType)
							.then(()=>{
									return resolve();
							});
					}
			}
		}
		const authPromise = new Promise(onAuthPromise);
		return authPromise;
  }
}

function toggleArrayProperty(userId, propName, item, isSub){
	const targetRef = userDbRef.child(userId).child(propName);
	return targetRef.transaction(toggleArrayItems(isSub, item));
}


function toggleGameLikeToUser(gameId, isSub){
	return function(dispatch, getState){
		const {uid} = getState().login.firebaseUser;
		return toggleArrayProperty(uid, constants.FIREBASE.KEY.GAME_LIKES, gameId, isSub)
		.then((result)=>{
			//console.warn('thenableResult', JSON.stringify(result));
			dispatch(receiveToggleGameLikeResult(gameId, isSub));
		})
	}
}

function toggleStudioLikeToUser(studioId, isSub){
	return function (dispatch, getState) {
		const {uid} = getState().login.firebaseUser;
		return toggleArrayProperty(uid, constants.FIREBASE.KEY.STUDIO_LIKES, studioId, isSub)
		.then((result)=>{
			dispatch(receiveToggleStudioLikeResult(studioId, isSub));
		})
	}
}
export {
	signInFirebase,
	fetchUserInfo,
	signOutFirebase,
	requestUserInfo,
	receiveUserInfo,
	toggleGameLikeToUser,
	toggleStudioLikeToUser,
}
