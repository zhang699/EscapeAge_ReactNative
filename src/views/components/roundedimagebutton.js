

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import ImageButton from './imagebutton';
import Colors from '../values/colors'
class RoundedImageButton extends Component {
  render(){
    const imageInfo = this.props.image;
    const {
      overlayOnly,
      buttonText,
      onPress,
      borderColor=Colors.played_button,
      backgroundColor=Colors.played_button,
      touchable={activeOpacity:0.9, underlayColor:'#F5890Dcc'}} = this.props;
    const image = {
      ... this.props.image,
      style:[imageInfo && styles.imageButtonImage, imageInfo && imageInfo.style]
    }
    const containerStyle = [styles.imageButtonContainer, this.props.containerStyle];

    return (
      <ImageButton
        containerStyle={containerStyle}
        textStyle={styles.imageButtonText}
        onPress={onPress}
        backgroundColor={backgroundColor}
        touchable={touchable}
        radius={20}
        borderColor={borderColor}
        overlayOnly={overlayOnly}
        image={image}
        buttonText={buttonText}>
      </ImageButton>
    )
  }
}

const styles = StyleSheet.create({
  imageButtonText:{
    color:'white',
    fontSize:15,
    marginVertical:5,
    padding:5
  },
  imageButtonImage:{
    width:20,
    height:20
  },
  imageButtonContainer:{
    width:150,
  },
})

export default RoundedImageButton;
