import React, {Component} from 'react';
import {View} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';

import {Button, Icon, SocialIcon} from 'react-native-elements';

const socialName = ['facebook', 'youtube-play', 'youtube']
class IconButton extends Component {

  isSocialIcon(name){
    return socialName.indexOf(name) >= 0;
  }
  render(){
    const color = this.props.color || '#abababaa';
    const underlayColor = this.props.underlayColor || '#222222';
    const iconStyle = this.props.iconStyle || styles.buttonIconStyle;
    const buttonIconSize = 12;

    const onPress = this.props.onPress;
    const name = this.props.name;

    const isSocialIcon = this.isSocialIcon(name);
    const type = isSocialIcon ? 'font-awesome' : 'material'


    return (
      <View>
        {
          /*!isSocialIcon &&*/
          <Icon
            containerStyle={styles.iconContainerStyle}
            onPress={onPress}
            iconStyle={iconStyle}
            size={buttonIconSize}
            color={color}
            type={type}
            reverse
            underlayColor={underlayColor}
            name={name}>
          </Icon>
        }
        {
          /*isSocialIcon &&
          <SocialIcon type={name}
                      style={[styles.socialButtonStyle, socialButtonStyle]}
                      onPress={onPress}
                      iconColor={'white'}
                      buttonIconSize={buttonIconSize}>
          </SocialIcon>*/
        }

      </View>

    )
  }
}

const iconSize = 18;
const styles=EStyleSheet.create({
  iconContainerStyle:{
    margin:3,
  },

  buttonIconStyle:{
    fontSize:iconSize,
    margin:0
  },
})

export default IconButton;
