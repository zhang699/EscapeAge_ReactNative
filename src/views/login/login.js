import React, { Component, PropTypes } from 'react'
import { Actions } from 'react-native-router-flux';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Image,
  TouchableHighlight,
} from 'react-native'
import Button from 'apsl-react-native-button';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

import {
  Drawables,
} from '../values/'
import {store,firebase} from '../../model/main';
import {signInFirebase, LOGIN} from '../../model/login/loginActions.js';
import config from '../../config';

import {
  ContentContainer,
  FBLoginButton,
} from '../components'



class LoginView extends Component{

  onRegisterNewAccount(){
    //console.log("on register new account");
  }
  onGoogleLoginButtonPress(){
    //console.log('google login button press')
  }

  loginSuccess(user, loginType){
    return store.dispatch(signInFirebase(user, loginType))
    .then(()=>{
        Actions.tabbar({});
    }).catch((e)=>{
      console.warn(e);
    });

  }
  onFBLoginSuccesssfully(user){
    this.loginSuccess(user, LOGIN.FB);
    //console.warn('Actions', Actions);
  }
  onGoogleSignPress(){

    GoogleSignin.signIn()
    .then((user) => {
      return this.loginSuccess(user, LOGIN.GOOGLE)
    }).catch((err) => {
      console.warn('WRONG SIGNIN', err);

    })
    .done();
  }

  clearLogin(){
    FBLoginManager.logout((info)=>{
      console.warn('FBLogin out', info);
    })
    GoogleSignin.signOut((info)=>{
      console.warn('Google out', info);
    })
  }
  componentDidMount(){
    const signInConfig = {
      iosClientId: config.iosClientId,
    }

    GoogleSignin.configure(config)
    .then(() => {
      console.warn('Google Sign in ready');

      /*GoogleSignin.currentUserAsync().then((user) => {
        console.log('USER', user);
        this.setState({user: user});
      }).done();*/
      return GoogleSignin.currentUserAsync()
    }).then((user) => {
      console.warn('Google Login USER', user);
      if (user){
        this.loginSuccess(user, LOGIN.GOOGLE);
      }
    }).done();
  }
  handleLoginButtonPress(){
    console.warn('login button press');
    //Actions.tabbar.gamelist({});
  }
  render(){
    return (

      <ContentContainer isBelowOfStatusBar style={styles.container}>

          <View style={[styles.header, styles.columnControlContainer]}>
            <Image style={styles.logo} source={Drawables.app_logo} />
            <Text style={styles.displayTextStyle}>密室錄</Text>
          </View>

          <View style={styles.control}>
            <View style={styles.input}>
              <View style={styles.inputWrap}>
                <TextInput style={styles.inputStyle} placeholder='e-mail' placeholderTextColor='#ffffff'/>
              </View>
              <View style={styles.inputWrap}>
                <TextInput style={styles.inputStyle} secureTextEntry={true} placeholderTextColor='#ffffff' placeholder='password' />
              </View>
            </View>


            <View style={[styles.columnControlContainer, styles.centerSelf]}>

              <Button
                activeOpacity={0.3}
                style={styles.loginBtn}
                textStyle={styles.displayTextStyle}
                onPress={() => this.handleLoginButtonPress()}>
                登入
              </Button>
            </View>
        </View>
        <View style={styles.spaceAroundContainer}>
          {/*<Text style={[styles.displayTextStyle, styles.smallMarginLR]}>使用其他帳號登入</Text>*/}

          <FBLogin
              buttonView={<FBLoginButton style={[styles.imageBtn, styles.smallMarginLR]}/>}
              permissions={["email","user_friends"]}
              onLogin={this.onFBLoginSuccesssfully.bind(this)}
              onLoginFound={this.onFBLoginSuccesssfully.bind(this)}
              onLoginNotFound={(e)=>{console.warn('onLoginNotFound', e)}}
              onLogout={(e)=>{console.warn('onLogout', e)}}
              onCancel={(e)=>{console.warn('onCancel', e)}}
              onPermissionsMissing={(e)=>{console.warn('onPermissionsMissing', e)}}/>


          <TouchableHighlight onPress={this.onGoogleSignPress.bind(this)}>
              <Image style={[styles.imageBtn, styles.smallMarginLR]} source={require('../../imgs/login_google.png')}/>
          </TouchableHighlight>

          {/*<GoogleSigninButton
               style={{width: 230, height: 48, backgroundColor:'rgba(0, 0, 0, 0)'}}
               onPress={this.onGoogleSignPress.bind(this)}/>*/}
        </View>

         <View style={styles.columnControlContainer}>
            <Button textStyle={styles.displayTextStyle} style={styles.registerNewAccountBtn} onPress={()=>this.onRegisterNewAccount()}>註冊新帳號</Button>
         </View>

      </ContentContainer>
    )
  }
}

var inputPadding = 70;
var loginBtnWidth = 140;
//var loginBtnMarginLeft = (Dimensions.get('window').width - loginBtnWidth) / 2;
const styles = StyleSheet.create({
  header:{
    marginTop:40,
    marginBottom: 20
  },
  inputWrap:{
    backgroundColor:'#0d0d0d',
    height:42,
    justifyContent: 'center',
    borderColor:'#ffffff',
    borderRadius: 24,
    paddingLeft:20,
    marginTop:12
  },
  input :{
    width: Dimensions.get('window').width - inputPadding,

  },
  inputStyle:{
    backgroundColor:'transparent',
    borderColor:'#ffffff',
    color:'#ffffff',
    alignItems:'center',
    textAlignVertical: 'center',
    justifyContent: 'center'
  },
  columnControlContainer:{

    justifyContent: 'center',
    alignItems: 'center',
    width : loginBtnWidth,
  },
  centerSelf:{
    alignSelf: 'center',
  },
  spaceAroundContainer:{
    justifyContent: 'space-around',
    marginTop: 30,
    height: 100,
  },
  rowControlContainer:{
     flexDirection:'column',
     justifyContent: 'center',
     alignItems: 'center',
     height:120,
     marginTop:20,
  },
  smallMarginLR : {
     marginLeft:6,
     marginRight:6
  },
  logo : {
    width:108,
    height:108,
    marginTop:5
  },
  imageBtn:{
    width:36,
    height:36,
  },
  otherAccountTitle:{
    color:'white'
  },
  loginBtn:{
    //fontSize: 20,
    borderColor: '#f39c12',
    borderRadius: 40,
    height: 40,
    backgroundColor: '#f1c40f',

  },
  registerNewAccountBtn:{
     width : 100,
     backgroundColor:'transparent',
     borderColor:'transparent',
     //fontSize: 20
  },
  displayTextStyle :{
     color:'white'
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    //fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  control:{
    justifyContent: 'space-around',
    height: 200,
  }
})


export default LoginView
