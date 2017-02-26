

import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native'
import {ConfirmModal} from './';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {Strings, Colors} from '../values';
import EStyleSheet from 'react-native-extended-stylesheet';
class SortingByTypeModal extends Component {

  constructor(props){
    super(props);

  }
  onRadioButtonPress(value){
    this.setState({value:value})
  }

  render(){

    const {modalDidClose, open, onRadioButtonPress, initial=0} = this.props;
    const {radioItems} = this.props
    const modal = {
      modalDidClose,
      open
    }
    return (
      <ConfirmModal modal={modal}  {...this.props} containerStyle={styles.modalContainer}>
        <View style={styles.radioButtonContainer}>
          <RadioForm
            radio_props={radioItems}
            initial={initial}
            onPress={onRadioButtonPress}
            buttonColor={Colors.button_red}
          />
        </View>
      </ConfirmModal>
    )
  }
}

const styles = EStyleSheet.create({
  modalContainer:{
    height:220,
  },
  radioButtonContainer:{
    width:'90%',
    flexDirection:'row',

    justifyContent:'flex-start',
    alignItems:'center',
  }
})

export default SortingByTypeModal;
