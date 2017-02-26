
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import ImageClickableText from './imageclickabletext';
import Colors from '../values/colors';
class DetailInfoText extends Component {
  render(){
    const {image, onPress, text, containerStyle, textLayoutStyle} = this.props;
    const textStyle = onPress ? styles.clickableText: styles.unclickableText;
    return (<ImageClickableText
            onPress={onPress}
            containerStyle={[styles.detailInfoTextContainer, containerStyle]}
            image={{source:image, style: styles.clickableTextItemImage}}
            text={text}
            textStyle={[textStyle, textLayoutStyle]}>
          </ImageClickableText>)
  }
}

const styles = StyleSheet.create({
  detailInfoTextContainer:{
    marginTop:5,
    marginBottom:10,
  },
  detailInfoContainer:{
    marginTop:10
  },
  clickableTextItemImage:{
    tintColor:'white',
    width:16,
    height:16
  },
  clickableText:{
    color:Colors.primary,
  },
  unclickableText:{
    color:'white'
  },
})
export default DetailInfoText;
