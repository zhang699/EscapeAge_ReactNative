
import moment from 'moment';
import constants from '../constants';

export function formatTimestamp(timestampInMills){
  return moment.unix(timestampInMills / 1000).format(constants.DATE.PICKER_DATE_FORMAT);
}

/**formatToString*/
export function format(date, formatString){
  return moment(date).format(constants.DATE.PICKER_DATE_FORMAT);
}

export function formatToDatePickerStr(date){
  return format(date, constants.DATE.PICKER_DATE_FORMAT);
}

export function formatDisplayStrToCalSelectedStr(timeString){
  return moment(timeString, constants.DATE.PICKER_DATE_FORMAT).format(constants.DATE.SELECTED_CALENDAR_FORMAT);
}

export function formatStringToTimestamp(timeString, format){
  return moment(timeString, format).valueOf();
}

export function forceToTimestamp(date){
  return typeof(date) !== 'string' ? date.valueOf() : moment(date).valueOf();
}
