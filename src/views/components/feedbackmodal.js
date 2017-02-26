
import React, {Component} from 'react';
import {View, TextInput, Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Button} from 'react-native-elements';
import ModalPicker from 'react-native-modal-picker'
import _ from 'lodash';
import ConfirmModal from './confirmmodal';
import {
  Strings,
} from '../values/'

class FeedbackModal extends Component {

  static getPickerInfo(){
    return [
      'APP建議',
      '異常回報',
      '資料錯誤',
      '新增密室',
      '合作提案'
    ]
  }

  constructor(props){
    super(props);

    this.state= {
      selectedItem:{index:0, label:'APP建議'},
      text:''
    }
    this.cancelButton = this.props.cancelButton;
    this.confirmButton = this.props.confirmButton;

    const onCancelPress = this.cancelButton.onPress;
    const onConfirmPress = this.confirmButton.onPress;

    this.cancelButton.onPress = ()=>{
      return onCancelPress(this.getModalResponse());
    }

    this.confirmButton.onPress = ()=>{
      return onConfirmPress(this.getModalResponse())
    }
  }
  getModalResponse(){
    const feedbackContent = this.state.feedbackContent;
    const item = this.state.selectedItem;
    return {
      feedbackContent,
      item
    }
  }
  getPickerData(){
    const infos = FeedbackModal.getPickerInfo();
    let index = 0;
    const data = _.map(infos,(info)=>{
      return {
        index:index++,
        label:info
      }
    })
    return data
  }
  onChangeText(feedbackContent){
    this.setState({
      feedbackContent
    })
  }
  onPickerChange(option){
    this.setState({
      selectedItem:option
    })
  }
  render(){
    const {title, open, modalDidClose} = this.props;
    const typeHint = '類型';
    const MAX_LENGTH = 140;
    const modal = {
      open,
      modalDidClose
    };
    const initPickerValue = 'App建議';
    const cancelText = '取消';
    return (

        <ConfirmModal
          title={title}
          modal={modal}
          cancelButton={this.cancelButton}
          confirmButton={this.confirmButton}>
            <View style={styles.type}>
              <Text style={styles.typeHint}>{typeHint}</Text>
              <ModalPicker
                   data={this.getPickerData()}
                   initValue={this.state.selectedItem.label}
                   cancelText={cancelText}
                   onChange={this.onPickerChange.bind(this)}>

                <View>
                    <Text>{this.state.selectedItem.label}</Text>
                </View>
              </ModalPicker>
            </View>

            <TextInput
              onChangeText={this.onChangeText.bind(this)}
              style={styles.content}
              multiline={true}
              placeholder={Strings.feedback_hint}
              editable={true}
              maxLength={MAX_LENGTH}>
            </TextInput>

        </ConfirmModal>

    )
  }
}

const styles=EStyleSheet.create({
  typeText:{
    fontSize:8,
    height:10
  },
  content:{
    width:'80%',
    height:140,
    fontSize:20,
    borderRadius:5,
    borderWidth:1,
    borderColor:'#ccc',
    marginTop:20,
  },
  typeHint:{
    fontSize:18,
    marginRight:20,
  },
  type:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  typeButton:{
    height:8
  },
  button:{
    marginTop:100
  }
})
export default FeedbackModal;
