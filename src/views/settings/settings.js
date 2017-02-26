
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Image,
  ListView,
  Switch,
  Linking,
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { List, ListItem } from 'react-native-elements';
import {CheckBox} from 'react-native-elements';


import Share from 'react-native-share';
import { FBLoginManager } from 'react-native-facebook-login';
import { GoogleSignin } from 'react-native-google-signin';

import { Actions } from 'react-native-router-flux';

import Global from '../global'
import {store} from '../../model/main';

import {
  ContentContainer,
  TabBarScrollView,
  CustomizedChevronListItem,
  Avatar,
  FeedbackModal,
  LicenseModal,
} from '../components';

import { signOutFirebase, LOGIN } from '../../model/login/loginActions';
import {
  Drawables,
  Strings,
  Colors,
} from '../values';

class Settings extends Component{

    constructor(props){
      super(props)
      this.state = {
        notificationEnabled:true,
        appVersion:'2.1.160726.0',
        isFeedbackModalOpen: false,
        isLicenseModalOpen: false,
      };
      this.onFeedbackModalClose = this.onFeedbackModalClose.bind(this);
      this.onFeedbackModalConfirm = this.onFeedbackModalConfirm.bind(this);
      this.onFeedbackModalCancelled = this.onFeedbackModalCancelled.bind(this);
      
      this.onLicenseModalClose = this.onLicenseModalClose.bind(this);
      this.onLicenseModalConfirm = this.onLicenseModalConfirm.bind(this);

    }


    getSettingsItem(){

      const settingList = [
        {
          avatar: Drawables.settings_message,

          name: Strings.news,
        },
        {
          name: Strings.show_notification,
          avatar: Drawables.settings_announce,
          view : CustomizedChevronListItem,
          customizedChevron: ()=>{
              //console.warn('what is this', this.constructor.name);
            const onValueChanged = (value)=>{

              this.setState( prevState=>({
                  notificationEnabled:value
              }));

              /*temporary solution, refresh all lisitem again to reflect control changed*/
              this.updateListView();
            }

            return <Switch value={this.state.notificationEnabled}
              onValueChange={onValueChanged}></Switch>
        },
          },
        {
          name: Strings.logout,
          avatar: Drawables.settings_logout,
          onPress:this.logout.bind(this)
        },
        {
          name: Strings.feedback,
          avatar: Drawables.settings_feedback,
          onPress:this.giveFeedback.bind(this)
        },
        {
          name: Strings.facebook,
          avatar: Drawables.settings_facebook,
          onPress: this.goFacebook,
        },
        {
          name: Strings.rating_for_app,
          avatar: Drawables.settings_thumbs_up,
          onPress:this.giveThumbsUp.bind(this)
        },
        {
          name: Strings.share_this_app,
          avatar: Drawables.settings_share,
          onPress:this.shareEscapeAge.bind(this)
        },
        {
          name: Strings.open_sources,
          avatar: Drawables.settings_code,
          onPress:this.viewCodeLicenses.bind(this)
        },
        {
          name:Strings.version,
          avatar: Drawables.settings_version,
          view:CustomizedChevronListItem,
          customizedChevron:()=>{
            return (
              <Text style={styles.appVersion}>{this.state.appVersion}</Text>
            )
          }
        }
      ]

      return settingList;
    }

    goFacebook() {
      Linking.openURL('https://www.facebook.com/escapeage/');
    }
    componentWillMount(){
      this.updateListView();
    }

    shareEscapeAge(){
      console.warn('shareEscapeAge')
      Share.open({
        title: Strings.app_name,
        message: Strings.share_this_app_content,
        subject: 'Share Link',
      }).catch(error=>{
        console.warn('shareEscapeAge.error', error);
      })
    }
    viewCodeLicenses(){
      console.warn('viewCodeLicenses')
      this.setState({
        isLicenseModalOpen: true,
      })
    }
    onLicenseModalConfirm(){
      this.setState({
        isLicenseModalOpen: false,
      })
    }

    logout(){
      store.dispatch(signOutFirebase())
      .then(()=>{
        const { userType } = store.getState().login;
        if (userType === LOGIN.FB){
          FBLoginManager.logout(()=>{
            Actions.loginPage({});
          })
        } else if (userType === LOGIN.GOOGLE){
          GoogleSignin.signOut().then(()=>{
            Actions.loginPage({});
          })

        }
      })
    }

    giveFeedback() {
      this.setState({
        isFeedbackModalOpen:true,
      })
    }

    giveThumbsUp(){
      Linking.openURL('https://www.facebook.com/escapeage/');
    }

    updateListView(){
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      const list = this.getSettingsItem();
      const dataSource =  ds.cloneWithRows(list);
      this.setState({
        dataSource
      })
    }
    renderListItemRow(item, sectionID){
      const highlightColor = '#888888aa';
      const ListItemComponent = item.view || ListItem;
      const defaultOnPress = ()=>{ console.warn('item be clicked' )}
      const onPress = item.onPress || defaultOnPress;

      return (
        <ListItemComponent
          key={sectionID}
          title={item.name}
          avatar={item.avatar}
          underlayColor={highlightColor}
          onPress={onPress}
          avatarStyle={styles.itemAvatarStyle}
          containerStyle={styles.itemContainerStyle}
          titleStyle={styles.itemTitleStyle}
          customizedChevron={item.customizedChevron}
          {...item.props}
        />
      )
    }

    onFeedbackModalClose(){
      this.setState({
        isFeedbackModalOpen: false,
      })
    }

    onFeedbackModalCancelled(){
      this.setState({
        isFeedbackModalOpen: false,
      })
    }

    onFeedbackModalConfirm(){
      this.setState({
        isFeedbackModalOpen: false,
      })
    }

    onLicenseModalClose() {
      this.setState({
        isLicenseModalOpen: false,
      })
    }
  	render(){
      const reduxState = store.getState();
      const {photoURL, displayName} = reduxState.login.providerData;

  		return (
        <ContentContainer isBelowOfStatusBar>
           <TabBarScrollView>
             <View style={styles.avatarBlock}>
               <Avatar source={{uri:photoURL}} radius={50} style={styles.avatar}></Avatar>
               <Text style={styles.name}>{displayName}</Text>
             </View>

              <List containerStyle={styles.itemListStyle}>

                <ListView
                  scrollEnabled={false}
                  renderRow={this.renderListItemRow}
                  dataSource={this.state.dataSource}
                />

              </List>
          </TabBarScrollView>
          <FeedbackModal 
            title={Strings.feedback}
            modalDidClose={this.onFeedbackModalClose}
            cancelButton={
              {
                text: Strings.cancel,
                onPress:this.onFeedbackModalCancelled,
              }
            }
            confirmButton={
              {
                text: Strings.ok,
                onPress: this.onFeedbackModalConfirm,
              }
            }
            open={this.state.isFeedbackModalOpen}
          />
          <LicenseModal
           open={this.state.isLicenseModalOpen}
           modalDidClose={this.onLicenseModalClose}
           title={Strings.open_sources}
           confirmButton={{
             text: Strings.ok,
             onPress: this.onLicenseModalConfirm,
           }}/>      
        </ContentContainer>
  		)
  	}
}
const styles = EStyleSheet.create({
    title:{
      marginTop:5,
      color:'white'
    },
    appVersion:{
      color:'white'
    },
    checkBoxContainer:{
      marginRight:0,
      padding:0,
      borderColor:'transparent',
      backgroundColor:'transparent'
    },
    avatar:{
      borderWidth:2,
      borderColor:'white'
    },
    avatarBlock:{
      justifyContent:'center',
      alignItems : 'center',
      height:'35%'
    },
    itemContainerStyle:{
      backgroundColor:'transparent',
      justifyContent:'center',
      borderBottomColor:'gray',
      borderBottomWidth:1
    },
    itemListStyle:{
      borderColor:'transparent' // cancel list border color which shows two divider at top and bottom
    },
    itemTitleStyle:{
      color:'white',
      marginVertical:10,
    },
    itemAvatarStyle:{
      tintColor:'white',
      width:24,
      height:24,
      alignSelf:'center'
    },
    name:{
      fontWeight:'700',
      color:'white',
      marginTop:10,
      fontSize:20
    },

});

export default Settings;
