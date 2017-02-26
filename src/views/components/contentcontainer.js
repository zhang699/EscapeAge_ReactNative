
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import Global from '../global';
import Colors from '../values/colors';
const HORIZONTAL_PADDING = 10;
import {MenuContext} from 'react-native-menu';
const LAZY_RENDER = 200; //used to avoid menu show outside screen problem
class ContentContainer extends Component {
  render(){
    /*const bottomMargin = this.props.bottomMargin != undefined ? this.props.bottomMargin : Global.TAB_BAR_HEIGHT;
    const topMargin = this.props.topMargin != undefined ? this.props.topMargin : Global.NAVIGATION_BAR_HEIGHT;
    const sidePadding = this.props.horizontalPadding != undefined ? this.props.horizontalPadding : HORIZONTAL_PADDING;
    ?*/
    const defaultLayoutStyle = {
      marginBottom:Global.TAB_BAR_HEIGHT,
      marginTop:Global.NAVIGATION_BAR_HEIGHT,
      paddingHorizontal:HORIZONTAL_PADDING
    }
    const {paddingHorizontal=HORIZONTAL_PADDING} = this.props;
    const belowWithStatusBarStyle = {
      marginTop:Global.STATUS_BAR_HEIGHT,
      flex:1,
      paddingHorizontal
    }
    const {isBelowOfStatusBar, isWrapMenuContext} = this.props;
    const layoutStyle = (isBelowOfStatusBar && belowWithStatusBarStyle) || this.props.layoutStyle || defaultLayoutStyle;
    const colorStyle = {
      backgroundColor:Colors.primary_dark
    }
    return (
      <View style={[this.props.style, layoutStyle, colorStyle]}>
        {
          !isWrapMenuContext && this.props.children
        }
        {
          isWrapMenuContext &&
            <MenuContext style={styles.menuContext} lazyRender={LAZY_RENDER}>
              {this.props.children}
            </MenuContext>
        }
    </View>
    )
  }
}
const styles = StyleSheet.create({
  menuContext:{
    flex:1
  }
})

export default ContentContainer;
