import React, { Component } from 'react';


import {
   AppRegistry,
   TextInput,
   StyleSheet,
   View,
   Input,
   Text
} from 'react-native';

import Modal from 'react-native-simple-modal';
import {Button} from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
class ConfirmModal extends Component {

  render(){
    const modalProps = {...this.props.modal}
    const {cancelButton, confirmButton, containerStyle, footerComponent} = this.props;

    return (
      <Modal {...modalProps}>
        <View style={[styles.container, containerStyle]}>
          <Text style={styles.title}>{this.props.title}</Text>
          <View style={styles.divider}></View>
          <View style={[styles.content]}>
            {this.props.children}
          </View>
          <View style={styles.control}>
            {cancelButton && <View style={styles.controlButton}>
              <Button onPress={cancelButton.onPress} buttonStyle={styles.cancelButton} title={cancelButton.text}></Button>
            </View>}
            <View style={styles.controlButton}>
              <Button onPress={confirmButton.onPress} buttonStyle={styles.confirmButton} title={confirmButton.text}></Button>
            </View>
          </View>
        </View>
        {footerComponent}
     </Modal>
    )
  }
}

const controlButtonRadius = 40;
const controlButtonPrimaryColor = '#ffbb00';
const controlButtonSecondaryColor = '#ababab';
const controlButtonHeight = 40;
const controlButtonWidth = 120;
const styles = EStyleSheet.create({
    container:{
      height:320,
      flexDirection:'column',
      justifyContent:'flex-start',
      alignItems:'center',
    },
    divider:{
      marginTop:10,
      height:1,
      backgroundColor:controlButtonSecondaryColor,
      width: '80%',
    },
    content:{
      flex:2,
      marginTop:10
    },
    title:{
      color:controlButtonSecondaryColor,
      fontSize:20,
    },
    cancelButton:{
      borderRadius:controlButtonRadius,
      backgroundColor:controlButtonSecondaryColor,
      height:controlButtonHeight,
    },
    confirmButton:{
      backgroundColor:controlButtonPrimaryColor,
      borderRadius:controlButtonRadius,
      height:controlButtonHeight,
    },
    control:{
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'flex-end',
      marginTop:40,
    },
    controlButton:{
      flex:1,
      height: 80,
      justifyContent: 'center',
    }
})

export default ConfirmModal;
