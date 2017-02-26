import {View, Text, StyleSheet, TouchableHighlight, Image}  from 'react-native';
import React, { Component, PropTypes } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

/**
  Example FBLoginView class
  Please note:
  - this is not meant to be a full example but highlights what you have access to
  - If you use a touchable component, you will need to set the onPress event like below
**/
class FBLoginView extends Component {
  static contextTypes = {
    isLoggedIn: React.PropTypes.bool,
    login: React.PropTypes.func,
    logout: React.PropTypes.func,
    props: React.PropTypes.object
  };
  static propTypes = {
     style:Image.propTypes.style
  };
  constructor(props) {
    super(props);

    console.warn(this.props.style);
  }

  render(){
    return (
      <View >
        <TouchableHighlight onPress={() => {
            if(!this.context.isLoggedIn){
              this.context.login()
            }else{
              this.context.logout()
            }
          }}>

            <Image style={this.props.style} source={require('../../imgs/login_fb.png')}/>
        </TouchableHighlight>
        {/*<Icon.Button
          color={"#000000"}
          backgroundColor={"#ffffff"} name={"facebook"}  size={20} borderRadius={100} >

        </Icon.Button>*/}
      </View>
    )
  }
}
export default FBLoginView;
