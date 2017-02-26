import React, {Component} from 'react';
import {
  Switch,
  StyleSheet
} from 'react-native'
import {
  Colors
} from '../values';

class OrangeSwitch extends Component {
  render(){
    const switchProp = {
      onTintColor:Colors.ksw_md_solid_checked,
      /*thumbTintColor:Colors.ksw_md_solid_checked*/
    }
    return (
      <Switch {...this.props} {...switchProp} ></Switch>
    )
  }
}

const styles = StyleSheet.create({

})

export default OrangeSwitch;
