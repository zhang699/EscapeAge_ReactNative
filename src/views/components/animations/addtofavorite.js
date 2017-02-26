
import React, {Component} from 'react';

import {
  View,
  Animated,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import {
  Drawables,
  Colors
} from '../../values';

const ORIGINAL_BOUNCE_VALUE = 0.2; //if set it to zero, it doesn't play animation.
const PLAYED_BOUNCE_VALUE = 1; //if set it to zero, it doesn't play animation.
class AddToFavoriteAnimation extends Component {

  constructor(props){
    super(props);
    const isFavorite = this.props.isFavorite;
    this.state = {
      bounceValue: isFavorite ? new Animated.Value(1) :new Animated.Value(0),
      isPress : isFavorite
    };
    const {friction=4, tension=100} = this.props;
    const animateConfig = {
      toValue:  1,                         // Animate to smaller size
      friction:friction,                          // Bouncier spring
      tension:tension
    }

    this.state.animateSpring = Animated.spring( // Base: spring, decay, timing
      this.state.bounceValue,     // Animate `bounceValue`
      animateConfig
    )
  }

  onPress(){
    const stateChanged = ()=>{
      const onPress =  this.props.onPress || function(){};
      onPress(this.state.isPress);
    }
    if (!this.state.isPress){
      this.setState({
        isPress:true
      }, stateChanged)
      this.state.animateSpring.start();
    }else{
      this.retore(stateChanged);
    }
  }
  retore(stateChanged=()=>{}){
    this.state.bounceValue.setValue(ORIGINAL_BOUNCE_VALUE);
    this.setState({
      isPress:false
    }, stateChanged)
  }
  componentDidMount(){
    if (!this.props.isFavorite){
        this.retore();
    }
  }
  render (){
    const pressImage = Drawables.btn_like_1;
    const normalImage = Drawables.btn_like_0;
    const animStyle = {
      transform:[
        {scale: this.state.bounceValue}
      ],
      tintColor:Colors.like_pressed
    }

    return (
      <TouchableHighlight  disabled={this.props.disabled} underlayColor={'transparent'} onPress={this.onPress.bind(this)}>
        <View style={styles.container}>
          {this.state.isPress
            &&
            <Animated.Image
              source={pressImage}
              style={[animStyle, this.props.style]}>
            </Animated.Image>
          }
          {!this.state.isPress
            &&
            <Animated.Image
              source={normalImage}
              style={[this.props.style]}>
            </Animated.Image>
          }
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    justifyContent:'center'
  }
})

export default AddToFavoriteAnimation;
