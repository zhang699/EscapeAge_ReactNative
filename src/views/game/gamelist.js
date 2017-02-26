
import React, { Component, PropTypes } from 'react';
import { connect, Provider } from 'react-redux'

import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Image,
  ListView,
  TouchableHighlight
} from 'react-native'

import EStyleSheet from 'react-native-extended-stylesheet'
import {MenuContext} from 'react-native-menu';
import {Actions} from 'react-native-router-flux';
import {
  fetchGameList,
  searchGameListByText,
  sortGameListByType
} from '../../model/presentation/presentationActions';


import {
  persistAreas,
  persistGameListSortOrder,
} from '../../model/persist/persistActions';


import {store} from '../../model/main';

import {
  ContentContainer,
  GameItem,
  ItemListView,
  SearchMenuBar,
  LoadingAnimation,
  SortingByTypeModal,
  AreaSortableModal,
  TouchableHighlightWrapper,
  menuSortList,
} from '../components';

import {Colors, Strings} from '../values';


class GameList extends Component{
  constructor(props){
    super(props);

    this.state = {
    }
  }
  componentWillMount(){
    store.dispatch(fetchGameList());
  }

  componentWillUpdate(){
    console.warn('update gamelist');
  }
  onItemPress(game){
    Actions.game({
      game
    })
  }
  renderRow(game, sectionID){
     const isPlayed = game.playedId !== undefined;
     return (
        <TouchableHighlightWrapper
          onPress={this.onItemPress.bind(this, game)}>
            <GameItem isShowInfoBar isShowGameStatus isShowAlreadyPlayed={isPlayed} game={game}/>
        </TouchableHighlightWrapper>
     )
  }

  textChanged(text){
    store.dispatch(searchGameListByText(text));
  }
  /**prevent game list form  unneccessary updateing*/
  shouldComponentUpdate(nextProps, nextState){
    return nextProps.action.actionType !== this.props.action.actionType
  }

  componentWillReceiveProps(nextProps){
    const {action} = nextProps;
    if (!action){
      return;
    }
    if (action.actionType === 'sortType'){
      const {sortByTypeOption} = action;
      store.dispatch(persistGameListSortOrder(sortByTypeOption));
      store.dispatch(sortGameListByType(sortByTypeOption))
    }else if (action.actionType === 'areaSort'){
      const {areas, sortByTypeOption} = action;
      store.dispatch(persistAreas(areas));
      store.dispatch(sortGameListByType(sortByTypeOption))
    }
  }
	render(){
    const sortByArea = Strings.sort_area;
    const sortByGame = Strings.sort_game;
		return (
  			<View>

            <SearchMenuBar
              menu={{onSelect:this.props.onMenuSelect}}
              textChanged={this.textChanged.bind(this)}
              options={[sortByArea, sortByGame]}>
            </SearchMenuBar>

            <ItemListView
              loadingComponent={()=>(<LoadingAnimation/>)}
              isFullScreen={true}
              renderRow={this.renderRow.bind(this)}
              listStateName={'gameList'}>
            </ItemListView>
  			</View>
	  )
	}
}


const styles = EStyleSheet.create({
  searchBar:{
    width:'80%',
    backgroundColor:'black',
  },

  contentLayout:{
    marginTop:0,
    marginRight:0,
  },
  searchBarText:{
    color:'white'
  },
  navigationTitle:{
    color:'#AABBCC'
  },
});

export default menuSortList(GameList, {
  radioItems:[
    {label: Strings.sort_popularity, value: 0 },
    {label: Strings.sort_game_studio, value: 1 },
    {label: Strings.sort_game_name, value: 2 },
  ],
  controlModal:{
    0 : 'areaSortableDialogOpen',
    1 : 'sortByTypeDialogOpen',
  },
  initial : ()=>{
    const {persist} = store.getState();
    return {
      sortByTypeOption: persist.gamelistSortType,
      areas:persist.areas,
    }
  }
});
