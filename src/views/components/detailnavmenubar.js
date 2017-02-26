
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {ImageButton, ActionBarMenu} from './';
import {Drawables, Strings} from '../values'
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
import {Actions} from 'react-native-router-flux';

class DetailNavMenuBar extends Component {

  constructor(props){
    super(props);
  }
  navigateBack(){
    Actions.pop();
  }
  render(){
    const actionBarBackImage = Drawables.actionbar_back_icon;
    const {menu} = this.props;
    const {menuOptions} = this.props;
    return (
      <View style={styles.container}>
        <ImageButton
          touchable={{
            underlayColor:'transparent',
          }}
          onPress={this.navigateBack.bind(this)}
          borderColor={'transparent'}
          containerStyle={styles.imageButton}
          image={{source:actionBarBackImage, style:styles.actionBarBackImage}}>
        </ImageButton>

        <View style={styles.spanner}></View>

        <ActionBarMenu menu={menu} options={menuOptions}></ActionBarMenu>

      </View>
    )
  }
}
const styles = StyleSheet.create({
  actionBarBackImage:{
    width:36,
    height:36
  },
  spanner:{
    flex:1
  },
  container:{
    flexDirection:'row',
    margin:5,
  },
  imageButton:{

    alignItems:'center',
    justifyContent:'center'
  }
})

export default DetailNavMenuBar;
