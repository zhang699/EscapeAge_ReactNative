
import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Image,
  ListView,
  TouchableHighlight
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

const TOUCH_UNDERLAY_COLOR='#aaaaaa'
class SearchBar extends Component{

  constructor(props){
    super(props);

    this.state = {
      isEmptyText:true
    }
  }
  static propTypes = {
     style : View.propTypes.style,
     textStyle : TextInput.propTypes.style
  };
  textChanged(event){
    const text = event.nativeEvent.text;
  
    this.props.textChanged(text);
    this.setState({
      isEmptyText : text === ''
    })
  }
  clearText(){
    this.refs['input'].clear(0);
  }
  renderClearButton(){
    return (
      <TouchableHighlight underlayColor={'#aaaaaa11'} activeOpacity={0.2} onPress={this.clearText.bind(this)}>
        <Image source={require('../../imgs/icon_search_cancel.png')} style={styles.searchBarIcon}></Image>
      </TouchableHighlight>
    )
  }
  render(){
      const {searchBarHeight} = this.props;
      //console.warn('searchBar width height', width, height);
      const fixedBarHeightStyle = {height:searchBarHeight}
      return (
        <View style={[styles.container, styles.searchRow, this.props.style, fixedBarHeightStyle]}>
            <View style={styles.iconContainer}>
                {<Image source={require('../../imgs/icon_search.png')} style={styles.searchBarIcon} ></Image>}
            </View>
            <TextInput
              ref='input'
              autoCapitalize="none"
              autoCorrect={false}


              returnKeyType='search'
              onChange={this.textChanged.bind(this)}
              style={[styles.searchTextInput, this.props.textStyle, fixedBarHeightStyle]}
            />
            <View>
                {!this.state.isEmptyText  && this.renderClearButton()}
            </View>
      </View>)
  }
}


const styles =  EStyleSheet.create({

  iconContainer:{
    justifyContent:'center',
    alignItems:'center'
  },
  searchBarIcon:{
    width:24,
    height:24,
    margin:3,
    alignSelf:'center'
  },
  searchRow: {
  	paddingLeft: 10,
	  flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: '#cccccc',
    alignItems: 'center',
    borderRadius: 25,
    borderWidth: 1,
    flex:1,
    height:40
  },
  searchTextInput: {
    paddingLeft: 10,
    flex:1,
  },
});
export default SearchBar;
