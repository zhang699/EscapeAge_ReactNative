import React, {Component, PropTypes} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Image,
  TouchableHighlight
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Strings} from '../values';
import GameImageBanner from './gameimagebanner';
import IconTitleView from './icontitleview';
import {Colors, Drawables} from '../values';
class GameItem extends Component{
  render(){
    const game = this.props.game;
    const studioOfGame = game.studioObj;
    const newFlagImage = Drawables.icon_new_flag_red;
    //console.warn('game item photo url', game.photoUrl);
    const {isShowInfoBar, isShowAlreadyPlayed, isShowGameStatus} = this.props;
    return (
        <View style={styles.gameItemContainer}>
          <GameImageBanner photoUrl={game.photoUrl}>
              <View style={styles.status}>
                  {game.isNew && isShowGameStatus && <Image source={newFlagImage} style={styles.newFlag}></Image>}
              </View>
              <View style={styles.textOverlay}>
                  <Text style={[styles.gameImageText, styles.gameNameText]}>{game.name}</Text>
                  <Text style={[styles.gameImageText, styles.gameStudioText]}>{studioOfGame ? studioOfGame.name : 'unknown'}</Text>
              </View>
          </GameImageBanner>


          {isShowInfoBar && <View style={styles.gameRowTitleContainer}>
              {isShowAlreadyPlayed && <IconTitleView style={styles.alreadyPlayedTitle} text={Strings.played}></IconTitleView>}
              <View style={styles.separator}></View>
              <Icon name="check-circle" style={styles.icon}></Icon>
              <Text style={styles.gameRowText}>{game.playeds}</Text>
              <Icon name="favorite" style={styles.icon}></Icon>
              <Text style={[styles.gameRowText]}>{game.likes}</Text>
          </View>}
       </View>
    )
  }
}

GameItem.propTypes = {
  game: PropTypes.object.isRequired,
}

const styles = EStyleSheet.create({
  newFlag:{
     alignSelf:'flex-end',
     marginRight:40,
     resizeMode:'cover',
     height:50,
     width:50,
  },
  status:{
    height:0 /** make size of status view can overlay in the parent*/
  },
  alreadyPlayedTitle:{
    marginTop:5,
  },
  textOverlay:{
    width:'90%',
    height:'25%',
    padding:10,
    justifyContent:'flex-end',
    alignItems:'flex-end'
  },
  gameImageBanner:{
     width:'90%',
     height:'25%',
     resizeMode:'cover',
     borderRadius:10
  },
  gameImageText:{

     textAlign:'right',
     fontWeight:'bold',
     color:'white',
  },
  gameNameText:{
     fontSize:20
  },
  gameStudioText:{
     color:'lightgrey',
     fontWeight:'bold',
     fontSize:18
  },
  gameRowText:{
     color:'white',
     marginLeft:5
  },
  gameItemContainer:{
     marginTop:20,
     flex:1,
     alignItems:'center',
  },
  icon:{
     color:'white',
     fontSize:15,
     marginLeft:5
  },
  separator:{
    flex:1,
  },
  gameRowTitleContainer:{
     flexDirection:'row',
     justifyContent:'flex-end',
     alignItems:'flex-end',
     width:'90%',
     marginTop:5
  }
})
export default GameItem;
