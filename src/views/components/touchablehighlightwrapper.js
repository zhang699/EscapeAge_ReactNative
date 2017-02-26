
import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, TouchableHighlight} from 'react-native';

class TouchableHighlightWrapper extends Component {
  render(){
    const defaultProps = {
      activeOpacity : 0.8,
      underlayColor:'transparent'
    }

    return (
      <TouchableHighlight
        {...this.props}
        {...defaultProps}>
        <View>
            {this.props.children}
        </View>
      </TouchableHighlight>
    )
  }
}

export default TouchableHighlightWrapper;
