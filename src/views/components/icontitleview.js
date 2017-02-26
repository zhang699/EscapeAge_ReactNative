
import React, {Component, PropTypes} from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import EStyleSheet from 'react-native-extended-stylesheet'
import {
  View,
  Image,
  Text
} from 'react-native';

class IconTitleView extends React.Component{
  static propTypes = {
    text:PropTypes.string.isRequired,
  }
  render(){
    const image = this.props.icon || require('../../imgs/icon_played.png');
    const textStyle = styles.textStyle;
    return (
      <View style={[styles.iconTitleContainer, this.props.style]}>
        <Image source={image} style={styles.iconImage}></Image>
        <Text style={[textStyle,this.props.textStyle]}>{this.props.text}</Text>
      </View>
    )
  }
}

const styles = EStyleSheet.create({
  iconImage:{
    width:18,
    height:18
  },
  textStyle:{
    marginTop:1,
    marginLeft:5,
    fontSize:16,
    color:'white'
  },
  iconTitleContainer:{
    flexDirection:'row',
    justifyContent:'flex-start',
    marginTop:15
  },
})
export default IconTitleView;
