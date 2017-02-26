
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Image,
  ListView
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
class TabIcon extends React.Component {

    checkTabIcon(isSelected){
        if (!this.props.name){
           return {uri:''}
        }
        //let path = '../../imgs/tab_game_0.png';
        /*console.warn('pros', this.props);
        console.warn('name', this.props.name);*/
        //console.warn('props.name', this.props.name);
        let iconSet = this.props.tabIcons[this.props.name]
        //console.warn('iconSet', iconSet);
        //return {uri:''}
        let image = isSelected ? iconSet.selected : iconSet.unselected; 
        if (image){
          return image;
        }else{
          throw  new Error('cannot find image with '+this.props.name +' '+JSON.stringify(iconSet))
        }
        
    }
    render(){
        let isSelected = this.props.selected;
        let selectedColor = 'goldenrod';
        let unSelectedTextColor = 'white';
        let unSelectedImageTintColor = 'white';

        let textColor = {color:isSelected ? selectedColor : unSelectedTextColor};
        let selectedImageStyle = {tintColor: isSelected ? selectedColor : unSelectedImageTintColor};
        let selectedTextStyle={color:selectedColor};
        return (
            <View style={styles.tabIconContainer}>
              <Image style={[styles.icon, selectedImageStyle]} source={this.checkTabIcon(isSelected)}></Image>
              <Text style={[textColor, styles.text]}>{this.props.title}</Text>
            </View>
        );
    }
}


const styles = EStyleSheet.create({
    icon : {
      width:24,
      height:24,
    },
    text:{
      marginTop:4
    },
    tabIconContainer:{
        alignItems:'center'
    }
})
export default TabIcon;