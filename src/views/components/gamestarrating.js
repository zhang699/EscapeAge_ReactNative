
import StarRating from 'react-native-star-rating';
import React, {Component} from 'react';
import {View} from 'react-native';
import Colors from '../values/colors';
class GameStarRating extends Component {
  constructor(props){
    super(props);
  }
  componentWillMount(){
    this.state= {
      starCount:this.props.starCount || 0
    }
  }
  onStarRatingPress(rating){
    const defaultPress =  ()=>{};
    const onPress = this.props.onPress || defaultPress;
    this.setState({
      starCount: rating
    })
    onPress(rating)

  }
  render(){
    const {starRatingContainerStyle, emptyStarColor} = this.props;
    return (
      <View style={starRatingContainerStyle}>
        <StarRating
        selectedStar={this.onStarRatingPress.bind(this)}
        maxStars={5}
        disabled={false}
        rating={this.state.starCount}
        emptyStarColor={emptyStarColor}
        starColor={Colors.primary}>
        </StarRating>
      </View>
    )
  }
}

export default GameStarRating;
