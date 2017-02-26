

import React, { Component } from 'react';
import {Router, Scene, ActionConst} from 'react-native-router-flux';
import {AppRegistry, StatusBar, View, Text} from 'react-native'

import LoginPage from './src/views/login/login.js';
import GameListPage from './src/views/game/gamelist.js';
import SettingsPage from './src/views/settings/settings.js';
import StudioPage from './src/views/studio/studiolist.js';
import LikePage from './src/views/likes/likes.js';
import AwardPage from './src/views/awards/awards.js';
import GameDetail from './src/views/game/gamedetail.js';
import StudioDetail from './src/views/studio/studiodetail.js';

import {store} from './src/model/main';
import {Provider} from 'react-redux';
import TabIcon from './src/views/components/tabicon';
import TabBar from './src/views/components/tabbar';
import EStyleSheet from 'react-native-extended-stylesheet'

import TestPage from './src/views/test/testpage.js';
import {Strings} from './src/views/values';
EStyleSheet.build() /**make EStyleSheet can be used in any class*/
//console.disableYellowBox = true;
export default class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <Router>
            <Scene key="root">

              <Scene type={ActionConst.RESET} key="loginPage" component={LoginPage} title="LoginPage" initial={true} hideNavBar={true}/>
              {/*<Scene key='studiodetail' component={StudioDetail} title='StudioDetail' initial={true} hideNavBar={true}/>*/}

              <Scene
                key="tabbar"
                tabIcons={TAB_ICONS}
                tabs={true}
                tabBarStyle={styles.tabBarStyle}
                tabBarIconContainerStyle={styles.tabBarIconContainerStyle}>
                  {/**the image of selectedIcon is according to Scene's key in TabIcon  component*/}
                  {/*<Scene key="test" icon={TabIcon} component={TestPage} title="測試" />*/}
                  <Scene key="gamelist" icon={TabIcon} component={GameListPage} title={Strings.game} hideNavBar={true}/>
                  <Scene key="like" icon={TabIcon} component={LikePage} title={Strings.like} hideNavBar={true}/>

                  <Scene key="studiolist" icon={TabIcon} component={StudioPage} title={Strings.studio} hideNavBar={true} />

                  <Scene key="award" icon={TabIcon} component={AwardPage} title={Strings.award} hideNavBar={true}/>

                  <Scene key="settings" icon={TabIcon} component={SettingsPage} title={Strings.more} hideNavBar={true}/>

              </Scene>


              <Scene key='studio' component={StudioDetail} title='StudioDetail' hideNavBar={true}/>
              <Scene key='game' component={GameDetail} initial={false} title='GameDetail' hideNavBar={true}/>

            </Scene>
          </Router>
        </Provider>
    )
  }
}

const TAB_ICONS = {
    /**Object keys matches with Scnene's key and preload all of matched image icon here*/
    gamelist:{
       selected: require('./src/imgs/tab_game_1.png'),
       unselected: require('./src/imgs/tab_game_0.png'),
    },
    settings:{
       selected: require('./src/imgs/tab_more_1.png'),
       unselected: require('./src/imgs/tab_more_0.png'),
    },
    studiolist:{
       selected: require('./src/imgs/tab_studio_1.png'),
       unselected: require('./src/imgs/tab_studio_0.png'),
    },
    like :{
       selected: require('./src/imgs/tab_like_1.png'),
       unselected: require('./src/imgs/tab_like_0.png'),
    },
    award :{
       selected: require('./src/imgs/tab_award_1.png'),
       unselected: require('./src/imgs/tab_award_0.png'),
    },
    test:{
      selected: require('./src/imgs/tab_award_1.png'),
      unselected: require('./src/imgs/tab_award_0.png'),
    }
}

const styles = EStyleSheet.create({
    tabIconContainer:{
       backgroundColor: 'red'
    },
    tabBarStyle:{
       backgroundColor:'black'
    },
    tabBarIconContainerStyle:{

    }
})

AppRegistry.registerComponent('EscapeAge_ReactNative', ()=>App);
