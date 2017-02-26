
/***/
import React, {Component} from 'react';
import {Text, View, Image, TouchableHighlight, StyleSheet} from 'react-native'
class ImageClickableText extends Component {

  render(){
    const ImageComponent = Image
    const {containerStyle, textTouchProps, imageStyle, onPress, source, text, textStyle, image} = this.props;
    return (

        <View style={[styles.container, containerStyle]}>
          <Image {...image}>
          </Image>
            <TouchableHighlight {...textTouchProps} onPress={onPress}>
              <Text style={[styles.text, textStyle]}>{text}</Text>
            </TouchableHighlight>
        </View>

    )
  }
}

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    alignItems:'center',

  },
  image:{
    width:8,
    height:8
  },
  text:{
    marginLeft:10
  }
})

export default ImageClickableText;
