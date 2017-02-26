
import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Image,
  ScrollView
} from 'react-native'
import {connect} from 'react-redux'
import {store} from '../../model/main';
import {fetchUserPlayedRecord, removePlayedGame} from '../../model/presentation/presentationActions';

import {
  ContentContainer,
  IconTitleView,
  ItemListView,
  PlayedGameItem,
  TabBarScrollView,
  LoadingAnimation,
} from '../components';

import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
import {Actions} from 'react-native-router-flux';
import {Strings} from '../values';
import Global from '../global';

const ACTION_GO_TO_GAME = 1;
const ACTION_REMOVE_FROM_PLAYED = 2;

class Awards extends Component{
    constructor(prop){
      super(prop)
      //console.warn(ContentContainer, IconTitleView, ItemListView, PlayedGameItem, TabbarScrollView, LoadingAnimation)
    }
    componentDidMount(){
      store.dispatch(fetchUserPlayedRecord())
    }
    renderRowOfAlreadyPlayed(playedGame){
      const menu = {
        onSelect : this.onItemSelect.bind(this, playedGame)
      }
      return <PlayedGameItem  menu={menu} playedGame={playedGame}/>
    }

    onItemSelect(playedGame, action){

      if (action === ACTION_GO_TO_GAME){
        const {game} = playedGame;
        Actions.game({game});
      }else if (action === ACTION_REMOVE_FROM_PLAYED){
        store.dispatch(removePlayedGame(playedGame));
      }else {
        console.error('unknown action', action);
      }
    }
    renderEscapeStatAndPlayeds(){
      return (
      <View>
        <View style={styles.escapeRateBlock}>
          <Text style={[styles.escapeRateText]}>{this.props.escapeStat.escapeRate}{'%'}</Text>
          <Text style={[styles.escapeRateExplain]}>{Strings.escape_rate}</Text>
        </View>
        <View style={styles.gameStat}>
          <View style={styles.statBlock}>
            <Text style={styles.statText}>{this.props.escapeStat.numOfAlreadyPlayeds}</Text>
            <Text style={styles.statExplain}>{Strings.escape_played}</Text>
          </View>
          <View style={styles.statBlock}>
            <Text style={styles.statText}>{this.props.escapeStat.numOfSuccess}</Text>
            <Text style={styles.statExplain}>{Strings.escape_escaped}</Text>
          </View>
        </View>


        <IconTitleView text={Strings.played} ></IconTitleView>

          <View style={styles.alreadyPlayedBlock}>
              <ItemListView
                scrollEnabled={false}
                loadingComponent={()=>(<LoadingAnimation/>)}
                style={styles.alreadyPlayedListView}
                renderRow={this.renderRowOfAlreadyPlayed.bind(this)}
                listStateName={'playeds'}/>
          </View>
      </View>)
    }
  	render(){
        const title = Strings.played
        const alreadyPlayedsTitle = '已玩過';
        const escapeStatExplainTitle = '成功脫出';
        const escapeRateExplainTitle = '逃脫率';
        const { isEmptyView } = this.props;
    		return (
          <ContentContainer isBelowOfStatusBar={true}>
              <MenuContext>
                <TabBarScrollView >
                  { !isEmptyView && this.renderEscapeStatAndPlayeds() }
                  {
                    isEmptyView &&
                    <View style={styles.emptyViewContainer}>
                      <Text style={styles.emptyPlayed}>{Strings.msg_empty_played}</Text>
                    </View>
                  }
                </TabBarScrollView>
              </MenuContext>
          </ContentContainer>

    		)
  	}
}
function mapStateToProps(state, ownProps){
  const {escapeStat} = state.playeds
  const isEmptyView = Object.keys(state.playeds.playeds).length === 0;
  return {
    escapeStat,
    isEmptyView
  }
}
const styles = StyleSheet.create({
    container:{
      backgroundColor:Global.BACKGROUND_COLOR
    },
    alreadyPlayedBlock:{
      flexDirection:'column',
      alignItems:'center'
    },
    alreadyPlayedListView:{

    },
    emptyPlayed:{
      color: 'white',
      fontSize: 18,
    },
    escapeRateBlock:{
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      height:200
    },
    escapeRateText:{
      fontSize:60,
      color:'white'
    },
    escapeRateExplain:{
      fontSize:18,
      color:'white'
    },
    statBlock:{
      marginHorizontal:10,
      flexDirection:'row',
      alignItems:'flex-end'
    },
    statText:{
      color:'white',
      fontSize:32
    },
    statExplain:{
      color:'white',
      fontSize:18,
      marginBottom:5
    },
    gameStat:{
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'flex-end'
    },
    emptyViewContainer:{
      alignItems: 'center',
      justifyContent: 'center',
      height: 500,
    },
    text:{
      color:'white'
    },

});

export default connect(mapStateToProps)(Awards);
