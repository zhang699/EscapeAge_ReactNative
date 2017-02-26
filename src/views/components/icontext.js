import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
class IconText extends Component{

  render(){
    const iconProps = this.props.icon;
    const IconComponent = this.props.iconComponent || Icon;
    const text = this.props.text
    const wrapperStyle = this.props.style;

    return (
      <View style={wrapperStyle}>
        <IconComponent {...iconProps} style={styles.icon}>
        </IconComponent>
        <Text style={styles.text}>{text}</Text>
        {/*<Icon name="favorite" style={styles.icon}></Icon>
        <Text style={[styles.gameRowText]}>{game.likes}</Text>*/}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text:{
     color:'white',
     marginLeft:5
  },
  icon:{
     color:'white',
     fontSize:15,
     marginLeft:5
  },
})



export default IconText;
