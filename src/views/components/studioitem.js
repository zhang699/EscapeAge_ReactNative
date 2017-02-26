import React, {Component} from 'react';
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

class StudioItem extends React.Component{

  render(){
    const {containerStyle, titleStyle, studio, title} = this.props;
    const nameStyle = this.props.subTitleStyle && title ? this.props.subTitleStyle : styles.text ;
    return (
        <View style={[styles.studioItemContainer, containerStyle]}>

            <Image source={{uri: studio.photoUrl}} style={styles.studioItemImageBanner} >

           </Image>

           <View style={styles.infoContainer}>
              {title && <Text style={titleStyle}>{title}</Text>}
              {<Text numberOfLines={1} ellipsizeMode={'tail'} style={nameStyle}>{studio.name}</Text>}
              {!title && <Text style={styles.address}>{studio.address}</Text>}
          </View>

          {this.props.children}

       </View>
    )
  }
}


const styles = EStyleSheet.create({
  studioItemContainer:{
      flexDirection:'row',
      alignItems:'center',
      flex:1,
  },
  text:{
      color:'white',
      fontSize:18,
      fontWeight:'bold'
  },
  address:{
      color:'grey',
      fontSize:16,
      marginTop:5
  },
  infoContainer:{
      flexDirection:'column',
      justifyContent:'center',
      marginLeft:10,
      flex:1
  },
  studioItemImageBanner:{
      width:50,
      height:50,
      borderRadius:25,
      borderColor:'white',
      borderWidth:1
  }
});
export default StudioItem;
