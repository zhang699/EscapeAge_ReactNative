
import React from 'react';
import {ScrollView} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Global from '../global';
class TabbarScrollView extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    const scrollViewProps = {
      ...this.props,
      contentContainerStyle:styles.scrollViewContainer,
      style:[styles.scrollViewStyle, this.props.style]
    };
    return (
      <ScrollView {...scrollViewProps}>

      </ScrollView>
    )

  }
}

const styles = EStyleSheet.create({
  scrollViewContainer:{
    paddingBottom:Global.TAB_BAR_HEIGHT
  },
  scrollViewStyle:{
    height:520
  },
})



export default TabbarScrollView
