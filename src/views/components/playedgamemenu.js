
import React, {Component} from 'react'
import {
  View,
  Text
} from 'react-native';

import {
  Strings
} from '../values';

import EStyleSheet from 'react-native-extended-stylesheet';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';

class PlayedGameMenu extends Component{

  render(){
    const goToGameTitle = Strings.go_to_game;
    const remove = '移除';
    const menuProps = {...this.props.menu}
    const style = this.props.style;
    return (
        <View style={style}>

          <Menu {...menuProps}>
            <MenuTrigger>
              <Text style={styles.menuTrigger}>&#8942;</Text>
            </MenuTrigger>
            <MenuOptions>
              <MenuOption value={1}>
                <Text style={styles.menuText}>{goToGameTitle}</Text>
              </MenuOption>
              <MenuOption value={2}>
                <Text style={styles.menuText}>{remove}</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>

        </View>
    )
  }
}
const styles = EStyleSheet.create({
  menuTrigger:{
    fontSize:25,
    color:'white'
  },
  menuText:{
    color:'black',
  }
})

export default PlayedGameMenu;
