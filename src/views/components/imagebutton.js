import React, { Component, PropTypes } from 'react'

import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Image,
  TouchableHighlight,
} from 'react-native'

class ImageButton extends Component{

  state={
    isPress:false
  }
	render(){

    const {
      containerStyle,
      backgroundColor,
      onPress,
      overlayOnly,
      textStyle,
      buttonText,
      isHideText,
      borderColor='white',
    } = this.props;
    const ImageComponent = this.props.imageComponent || Image;
    const imageProp = this.props.image

    const borderRadius = this.props.radius || 10;
    const touchable = this.props.touchable || {underlayColor:'green'}

    const buttonStyle = {
      backgroundColor:(this.state.isPress || overlayOnly) ? backgroundColor : 'transparent',
      borderColor: (this.state.isPress) ? 'transparent' : borderColor ,
      borderWidth:1,
      borderRadius
    }
    const touchableProps = {
      ...touchable,
      onPress : this.props.onPress,
      onHideUnderlay:()=>{
        //console.warn('onHideUnderlay')
        this.setState({
          isPress:false
        })
      },
      onShowUnderlay:()=>{
        //console.warn('onShowUnderlay')
        this.setState({
          isPress:true
        })
      }
    }

		return (
			<TouchableHighlight {...touchableProps} style={[containerStyle, buttonStyle]}>
        <View style={[styles.content]}>
			     {ImageComponent && <ImageComponent {...imageProp}></ImageComponent>}
           {!isHideText && <Text style={[styles.textStyle,textStyle]}>{buttonText}</Text>}
        </View>
			</TouchableHighlight>
		)
	}
}

const styles = StyleSheet.create({
  content:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  textStyle:{
    marginLeft:5,
  }
})

export default ImageButton;
