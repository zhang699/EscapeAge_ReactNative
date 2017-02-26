import Constants from '../constants';
import moment from 'moment'
class Game {
  constructor(){
    this.validateInvalidField();
  }
  fillZeroForEmptyField(fieldName){
    this[fieldName] = this[fieldName] === undefined || this[fieldName] < 0 ? 0 : this[fieldName];
  }
  validateInvalidField(){
    this.fillZeroForEmptyField('likes');
    this.fillZeroForEmptyField('playeds');
  }
  getPopularity(){
    return this.playeds * 4 + this.views * 2
  }
  isClosed(){
    const {status} = this;
    const isStartWithTagClosed = status.indexOf(Constants.GAME_STATUS.TAG_CLOSED) === 0;
    const containWithUnderScore = status.indexOf('_') >= 0;
    const isClosed = status !== undefined && isStartWithTagClosed && containWithUnderScore;
    return isClosed;
  }

  isAboutToOpen(){
    const {status, date} = this;
    const isStartWithTagAboutToOpened = status.indexOf(Constants.GAME_STATUS.TAG_ABOUT_TO_OPEN) === 0;
    const containWithUnderScore = status.indexOf('_') >= 0;
    if (isStartWithTagAboutToOpened && containWithUnderScore){
      const now = moment();
      const gameOpenDate = moment(date, 'YYMMDD');
      return now.isAfter(gameOpenDate);
    }
    return false;
  }
  getStudio(){
    return this.studioObj;
  }
  setStudio(studio){
    this.studioObj = studio;
  }
  getStudioId(){
    //console.warn('this.studioId', this.studioId);
    return this.studioId;
  }
  getViews(){
    return this.views;
  }
}

export default Game;
