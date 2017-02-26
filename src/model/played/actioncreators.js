
import {makeActionCreators} from '../utils/actionutil';
import {
  RECEIVE_USER_PLAYED_ITEM,
  RECEIVE_CREATE_USER_PLAYED_RESULT,
  RECEIVE_REMOVE_USER_PLAYED_RESULT} from './actiontypes';

module.exports = makeActionCreators({
  [RECEIVE_USER_PLAYED_ITEM] : ['playeds'],
  [RECEIVE_CREATE_USER_PLAYED_RESULT]:['played'],
  [RECEIVE_REMOVE_USER_PLAYED_RESULT]:['userId', 'playedId']
})
