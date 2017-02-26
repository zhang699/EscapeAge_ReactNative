

import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native'
import {
  ConfirmModal,
  OrangeSwitch,
  GameStarRating} from './'
import {Strings, Drawables, Colors} from '../values';
import {Button, Icon} from 'react-native-elements';
import constants from '../../model/constants';

import Calendar from 'react-native-calendar';
import {formatTimestamp, forceToTimestamp,
  formatToDatePickerStr, formatDisplayStrToCalSelectedStr} from '../../model/utils/time';
import Modal from 'react-native-simple-modal';
import EStyleSheet from 'react-native-extended-stylesheet';

class RatingAndPickDateModal extends Component {
  constructor(props){
    super(props)
  }

  componentWillMount(){
    this.resetState();
    this.notifyDateChangedEvent();
  }
  notifyDateChangedEvent(){
    this.onDateSelect(this.props.date || Date.now());
  }
  resetState(){
    const {date, switchValue, star} = this.props;
    this.state = {
      isSwitched:switchValue,
      selectedDate: date  ?  formatTimestamp(date) : formatToDatePickerStr(new Date()),
      star,
      isCalendarOpened:false,
    }
  }
  componentWillReceiveProps(nextProps){
    if (!nextProps.open){
      this.resetState();
    }
  }

  checkFailTextStyle(){
    return this.state.isSwitched ? styles.switchTextNonSelected : styles.switchTextFailed;
  }

  checkSuccessTextStyle(){
    return this.state.isSwitched ? styles.switchTextSuccess : styles.switchTextNonSelected;
  }
  onCalendarShowPress(){
    this.openCalendar(true);
  }

  openCalendar(isOpen){
    this.setState({
      isCalendarOpened:isOpen
    })
  }
  onCalendarModalDidClose(event){
    this.openCalendar(false)
  }
  onCalendarConfirmPress(){
    this.openCalendar(false);
  }
  onCalendarCancelPress(){
    this.openCalendar(false);
  }

  /*onConfirmButtonPress(confirmButton){
    const response = this.getModalResponse();
    typeof(confirmButton.onPress) === 'function' || confirmButton.onPress(response);
  }

  getModalResponse(){
    return {
      star:this.state.star,
      isSwitched:this.state.isSwitched,
      selectedDate:formatToDatePickerStr(date),
    }
  }*/
  onSwitchValueChanged(value){
    const {onSwitchValueChanged=()=>{}} = this.props;
    this.setState({
      isSwitched:value
    })

    onSwitchValueChanged(value);
  }
  onStarRatingPress(){
    const {onStarRatingPress=()=>{}} = this.props;

    onStarRatingPress();
  }

  /** convert to timestamp to outside */
  onDateSelect(date){
    this.setState({
      selectedDate:formatToDatePickerStr(date)
    })
    const selectedTimeStamp = forceToTimestamp(date);
    const onDateSelect = this.props.onDateSelect || function(){};
    console.warn('selectedTimeStamp', selectedTimeStamp, typeof(selectedTimeStamp));

    onDateSelect(selectedTimeStamp);
  }
  render(){
    const {
      onStarRatingPress,
      cancelButton={},
      confirmButton={},
      onSwitchValueChanged,
      onDateSelect,
      date,
      showPlayedOptionsOnly=false,
      switchValue=false} = this.props;

    const modal = {
      open:this.props.open,
      modalDidClose:this.props.modalDidClose
    };
    const calendarControlButtonProp = {
      color:'black',
      backgroundColor:'transparent',
      buttonStyle:styles.calendarControlButton,
      underlayColor:Colors.primary
    }
    const gameStarRatingProp = {
      emptyStarColor:Colors.primary,
      onPress:onStarRatingPress,
      starCount:this.props.star
    }
    const footerComponent = (
      <Modal open={this.state.isCalendarOpened} modalDidClose={this.onCalendarModalDidClose.bind(this)}>
        <View style={styles.calendarContainer}>
            <Calendar
              onDateSelect={this.onDateSelect.bind(this)}
              selectedDate={formatDisplayStrToCalSelectedStr(this.state.selectedDate)}
              showControls={true}>
            </Calendar>
            <View style={styles.calendarControl}>
              <Button {...calendarControlButtonProp} title={Strings.cancel} onPress={this.onCalendarCancelPress.bind(this)}>
              </Button>
              <Button {...calendarControlButtonProp} title={Strings.ok} onPress={this.onCalendarConfirmPress.bind(this)}>
              </Button>
            </View>
        </View>
      </Modal>
    )
    const calendarShowButtonProp = {
      backgroundColor:'transparent',
      buttonStyle:styles.calendarShowButton,
      textStyle:styles.calendarShowButtonText,
      color:'black',
    }
    const containerStyle = {
      height: showPlayedOptionsOnly ? 220 : 320,
    }
    return (

        <ConfirmModal
          title={Strings.add_to_played}
          modal={modal}
          containerStyle={containerStyle}
          cancelButton={cancelButton}
          confirmButton={confirmButton}
          footerComponent={footerComponent}>
            <View style={styles.modalContainer}>

                <View style={styles.calendarControlContainer}>
                  <Text>{Strings.played_date}</Text>
                  <Button {...calendarShowButtonProp} onPress={this.onCalendarShowPress.bind(this)} title={this.state.selectedDate}></Button>
                </View>
                <View style={styles.switchContainer}>
                  <Text style={[styles.text, this.checkFailTextStyle()]}>{Strings.played_failed}</Text>
                  <OrangeSwitch style={styles.orangeSwitch} value={this.state.isSwitched}  onValueChange={this.onSwitchValueChanged.bind(this)}>
                  </OrangeSwitch>
                  <Text style={[ styles.text, this.checkSuccessTextStyle()]}>{Strings.played_success}</Text>
                </View>

              {!showPlayedOptionsOnly && <View style={styles.ratingContainer}>
                <Text style={[styles.text, styles.ratingText]}>{Strings.rating}</Text>
                <GameStarRating {...gameStarRatingProp}></GameStarRating>
              </View>}
            </View>
        </ConfirmModal>
    )
  }
}

const styles = EStyleSheet.create({
  text:{
    color:'black',
    fontWeight:'bold',
  },
  ratingText:{
    marginBottom:10
  },
  calendarStyle:{

  },
  calendarShowButtonText:{
    fontSize:17,
  },
  modalContainer:{
    flexDirection:'column',
    flex:1,
    justifyContent:'space-around',
    alignItems:'center',
    height:120,
  },
  buttonContainerStyle:{
    backgroundColor:'transparent'
  },
  ratingContainer:{
    flexDirection:'column',
    alignItems:'center',
    height:50,
  },
  calendarControlContainer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  calendarControl:{
    flexDirection:'row',
    backgroundColor:'white',
    justifyContent:'flex-end'
  },
  calendarShowButton:{
    padding:10,
    paddingHorizontal:20,
    borderRadius:20,
    backgroundColor:Colors.app_gray
  },
  calendarContainer:{
    width:'100%',
    marginLeft:-48 /**woraround for arrange dialog to the screen center*/
  },
  calendarControlButton:{
    width:'10%',
    /*borderColor:'black',
    borderWidth:1,*/
    padding:10,
  },
  switchContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  orangeSwitch:{
    marginHorizontal:10,
  },
  switchTextSuccess:{
    color:Colors.played_success
  },
  switchTextFailed:{
    color:Colors.played_failed
  },
  switchTextNonSelected:{
    color:'gray'
  }
})

export default RatingAndPickDateModal;
