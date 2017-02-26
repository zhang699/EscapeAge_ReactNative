
import React, {Component} from 'react';
import {View, Button, StyleSheet, Text, Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import SearchBar from './searchbar';
import {Strings, Drawables} from '../values';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
import ActionBarMenu from './actionbarmenu';
class SearchMenuBar extends Component {

  render(){

    const {options, menu} = this.props;
    return (
      <View style={[styles.layout, this.props.style]}>
        <SearchBar
          searchBarHeight={40}
          style={styles.searchBar}
          textChanged={this.props.textChanged}>

        </SearchBar>

        <View style={styles.menu}>
            <ActionBarMenu options={options} menu={menu}></ActionBarMenu>
        </View>

      </View>
    )
  }
}


const styles = EStyleSheet.create({
  layout:{
    flexDirection:'row',
    margin:12
  },
  menuTriggerImg:{
    width:36,
    height:36,
  },
  menu:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    width:'10%',
  },
  searchBar:{
    width: '80%',
  },
  menuTrigger:{
    color:'white',
    fontSize:25,
  },
  mentText:{
    fontWeight:'bold',
  }
})

export default SearchMenuBar;
