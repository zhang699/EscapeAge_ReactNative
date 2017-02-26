

import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { ListItem } from 'react-native-elements';


class CustomizedChevronListItem extends Component{

  renderComponent({style, onPress, children, containerStyle}, {checked}){
    const container = {
      flexDirection:'row',
      justifyContent:'flex-end',
      paddingRight:1,
    }

    const checkBoxBlock={
      flex:1,
      justifyContent:'center',
      alignItems:'flex-end'
    }
    const CustomizedChevron = this.props.customizedChevron;
    return (
      <View  style={[style, container]}>
        {children}
        <View style={checkBoxBlock} >
          {/*<CheckBox right checked={checked} onPress={onPress} containerStyle={checkBoxContainer}></CheckBox>*/}
          <CustomizedChevron onPress={onPress}></CustomizedChevron>
        </View>
      </View>
    )
  }
  render(){
    return (

      <ListItem {...this.props} component={(componentProps)=>{
        return this.renderComponent(componentProps, {})
      }} />
    )
  }
}

CustomizedChevronListItem.defaultProps = {
  hideChevron: true,
}

const styles = EStyleSheet.create({
  text:{
    color:'white'
  },

})
export default CustomizedChevronListItem
