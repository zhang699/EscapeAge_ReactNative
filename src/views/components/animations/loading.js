
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Drawables, Colors} from '../../values';
import Animation from './ImageAnimation';

class LoadingAnimation extends Component {

  getAnimationImages(){
    return [
      Drawables.loading_01,
      Drawables.loading_02,
      Drawables.loading_03,
      Drawables.loading_04,
      Drawables.loading_05,
      Drawables.loading_06,
      Drawables.loading_07,
      Drawables.loading_08,
      Drawables.loading_09,
      Drawables.loading_10,
      Drawables.loading_11,
      Drawables.loading_12
    ]
  }

  render(){

    return (
      <View style={styles.container}>
        <Animation
          resideMode='stretch'
          animationCount={0}
          animationDuration={100}
          animationImages={this.getAnimationImages()}
          style={[this.props.style, styles.image]}
          onAnimationDone={this.props.onAnimationDone}>

        </Animation>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image:{
    tintColor:Colors.loading_animation,
    width:36,
    height:36,
  },
  container:{
    alignSelf:'center'
  }
})

export default LoadingAnimation;
