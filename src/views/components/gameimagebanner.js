

import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Image,
  ScrollView,
  TouchableHighlight
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors} from '../values';
class GameImageBanner extends React.Component{
  render(){
    const defaultTouchable = {
      underlayColor: 'transparent',
      activeOpacity:0.8,
    }
    const {photoUrl, bannerStyle, bannerOverlayStyle} = this.props;
    
    return (
        <Image source={{uri: photoUrl}} style={[styles.gameImageBanner, bannerStyle]}>

            <View style={[styles.overlay, bannerOverlayStyle]}>
                {this.props.children}
            </View>

        </Image>
    )
  }
}

const styles = EStyleSheet.create({
  gameImageBanner:{
     width:'90%',
     height:'25%',
     resizeMode:'cover',
     borderRadius:10
  },
  overlay:{ // used to make text more clearly
    width:'100%',
    height:'25%',
    backgroundColor:'#00000055',
  },

});

export default GameImageBanner;
