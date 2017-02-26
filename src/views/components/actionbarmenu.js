

import React, {Component} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {Drawables} from '../values';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';

class ActionBarMenu extends Component {

  render(){
    const menuProps = this.props.menu;
    const {options=[]} = this.props;
    return (
      <View style={styles.container}>
        <Menu {...menuProps}>
          <MenuTrigger>
            {/*<Text style={styles.menuTrigger}>&#8942;</Text>*/}

            <Image style={styles.menuTriggerImg} source={Drawables.actionbar_more}></Image>
          </MenuTrigger>
          <MenuOptions>
            {
              options.map((option, key)=>{
                return (
                  <MenuOption key={key} value={key}>
                    <Text style={styles.menuText}>{option}</Text>
                  </MenuOption>
                )
              })
            }
          </MenuOptions>
        </Menu>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container:{
    flexDirection:'row'
  },
  menuTrigger:{
    color:'white',
    fontSize:25,
  },
  menuTriggerImg:{
    width:36,
    height:36,
  },
  mentText:{
    fontWeight:'bold',
  }
})
export default ActionBarMenu;
