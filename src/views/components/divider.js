
import React, {Component} from 'react';
import {
  View,
  StyleSheet
} from 'react-native'

class Divider extends Component {
  render(){
    return (
      <View style={[styles.divider, this.props.style]}></View>
    )
  }
}

const styles = StyleSheet.create({
  divider:{
    width:300,
    height:1,
    borderColor:'white',
    borderWidth:1,
    alignSelf:'center'
  },
})
export default Divider;
