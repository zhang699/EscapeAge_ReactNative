
import React from 'react';
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
import EStyleSheet from 'react-native-extended-stylesheet';
import GameImageBanner from './gameimagebanner';
import PlayedGameMenu from './playedgamemenu';
import {
  Drawables,
  Colors,
} from '../values'
class PlayedGameItem extends React.Component{

  render(){
    //const playedGame = this.props.playedGame;
    const {menu, playedGame} = this.props;
    const game = playedGame.game;
    const isSuccess = playedGame.isSuccess;
    const gameStateIcon =  isSuccess ? Drawables.played_pass_green : Drawables.played_pass_red ;
    const gameStateSuccessColor = Colors.played_pass;
    const gameStateFailureColor = Colors.played_failed;
    //const gamePlayedStateIcon = {tintColor:isSuccess ? gameStateSuccessColor : gameStateFailureColor}

    return (
      <View style={styles.playedGameContainer}>
        <GameImageBanner  photoUrl={game.photoUrl}>

            <View style={styles.gamePlayedInfoBlock}>

              <Image style={[styles.gamePlayedStateIcon]} source={gameStateIcon}></Image>
              <View style={styles.gamePlayedDateBlock}>
                  <Text style={styles.nameText}>{game.name}</Text>
                  <Text style={styles.dateText}>{playedGame.displayPlayedDate}</Text>
              </View>
              <View style={styles.spanner}></View>
              <PlayedGameMenu style={styles.playedGameMenu} menu={menu}></PlayedGameMenu>
            </View>
        </GameImageBanner>
      </View>
    )

  }
}

const styles = EStyleSheet.create({
  playedGameContainer:{
    marginTop:24,
  },
  playedGameMenu:{
    flexDirection:'row',
    justifyContent:'center',
    alignSelf:'flex-start'
  },
  spanner:{
    flex:1
  },
  gamePlayedStateIcon:{
    width:32,
    height:32
  },
  gamePlayedInfoBlock:{
    flexDirection:'row',
    justifyContent:'flex-start',
    width:'90%',
    marginTop:10
  },
  gamePlayedDateBlock:{
    flexDirection:'column'
  },
  nameText:{
    color:'white',
    fontWeight:'700',
    fontSize:16,
    width:'50%',
  },
  dateText:{
    color:'white'
  }
});
export default PlayedGameItem;
