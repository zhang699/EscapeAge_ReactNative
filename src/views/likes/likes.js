
import React, { Component, PropTypes } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Image,
  ScrollView,
  RefreshControl
} from 'react-native'
import {store} from '../../model/main';
import {connect, Provider } from 'react-redux';


import {fetchLikeList} from '../../model/presentation/presentationActions';
import {
  Strings,
} from '../values'
import Global from '../global';

import {
  StudioItem,
  GameItem,
  IconTitleView,
  ContentContainer,
  TabBarScrollView,
  ItemListView,
  LoadingAnimation,
} from '../components';

class Likes extends React.Component{

   constructor(props){
     super(props)
     this.state = {
       isRefreshing:false
     }
   }
   componentWillMount(){
     store.dispatch(fetchLikeList());
   }
   renderRowOfGameLikes(game){
     return (<GameItem isShowTitleOnly={true} game={game}/>)
   }
   renderRowOfStudioLikes(studio){
     return (<StudioItem studio={studio}/>)
   }
   onRefresh(){
     this.setState({isRefreshing: true});
     store.dispatch(fetchLikeList())
     .then(()=>{
       console.warn('refreshing done');
       this.setState({isRefreshing: false});
     })
   }
   render(){


     const refreshControl = (
       <RefreshControl
         refreshing={this.state.isRefreshing}
         onRefresh={this.onRefresh.bind(this)}>
       </RefreshControl>
     )
     const studioTitle = Strings.studio;
     const gameTitle = Strings.game;
     return (
        <ContentContainer isBelowOfStatusBar={true} style={styles.container}>
          <TabBarScrollView refreshControl={refreshControl}>
            <IconTitleView text={studioTitle}/>
            <ItemListView
              emptyText={Strings.msg_empty_likes}
              scrollEnabled={false}
              loadingComponent={()=>(<LoadingAnimation/>)}
              style={styles.studioLikeListView}
              renderRow={this.renderRowOfStudioLikes.bind(this)}
              listStateName={'studioLikes'}/>
            <IconTitleView text={gameTitle}/>
            <ItemListView
              emptyText={Strings.msg_empty_likes}
              scrollEnabled={false}
              loadingComponent={()=>(<LoadingAnimation/>)}
              style={styles.gameLikeListView}
              renderRow={this.renderRowOfGameLikes.bind(this)}
              listStateName={'gameLikes'}/>
          </TabBarScrollView>
        </ContentContainer>
      )
   }
}
const styles = StyleSheet.create({
    container:{
      backgroundColor:Global.BACKGROUND_COLOR
    },
    gameLikeListView:{
      marginTop:10,
    },
    studioLikeListView:{
      marginTop:15,
    },
});


export default (Likes);
