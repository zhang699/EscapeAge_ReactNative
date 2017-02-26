import React, {Component, PropTypes} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Image,
} from 'react-native'

class Avatar extends Component {
    render(){
      const {source, radius} = this.props;
      const circlePhotoStyle = {
        width:radius*2,
        height:radius*2,
        borderRadius:radius,
      }
      const avatarImgProps = {
        source,
        style : [circlePhotoStyle, this.props.style]
      }
      return (
        <Image {...avatarImgProps} >
        </Image>
      )
    }
}

const styles = EStyleSheet.create({

})

export default Avatar;
