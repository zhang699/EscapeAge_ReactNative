

import Global from '../global';
import React, { Component, PropTypes } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Image,
  ListView
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {connect, Provider } from 'react-redux'
class ItemListView extends React.Component{
  static propTypes={
    style:View.propTypes.style
  }

  constructor(props){
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      scrollPosition:0,
    }
  }

  handleScroll(contentWidth, contentHeight){
    const scrollPosition = contentHeight;
    this.setState({
      scrollPosition,
    })
  }

  /*componentDidUpdate(){
    console.warn('itemlistview.componentWillUpdate');
    this.listView.scrollTo({y:this.state.scrollPosition});
  }*/
  renderListLoading(){
    const defaultLoadingComponent = ()=>(<Text style={styles.loadingText}>Loading...</Text>)
    const LoadingComponent = this.props.loadingComponent || defaultLoadingComponent;
    return (<LoadingComponent></LoadingComponent>)
  }
  /*componentDidUpdate(){
    console.warn('componentDidUpdate');

  }

  componentWillReceiveProps(){
    console.warn('componentWillReceiveProps');
    if (this.listView){
      const {scrollPosition} = this.state;
      console.warn('scrollToPosition', scrollPosition);
      this.listView.scrollTo({y:scrollPosition});
    }
  }
  componentDidMount(){
    console.warn('componentDidMount');
  }*/

  renderList(){
    const { renderRow, dataSource } = this.props;
    const isEmptyView = dataSource.getRowCount() === 0;
    return (
        <View>
            {!isEmptyView &&
              <ListView
                ref={(ref)=>{this.listView = ref}}
                style={[this.props.isFullScreen ? styles.list:{}, this.props.style]}
                contentInset={{bottom:Global.TAB_BAR_HEIGHT}}
                renderRow={renderRow}
                enableEmptySections={true}
                onContentSizeChange={this.handleScroll}
                scrollEnabled={this.props.scrollEnabled}
                dataSource={dataSource} />
            }
            {
              isEmptyView &&
              <Text style={styles.emptyText}>{this.props.emptyText}</Text>
            }
      </View>
    )
  }
  render(){
    const {isLoading, list, dataSource} = this.props;
    const margin = this.props.isFullScreen ? styles.contentContainer : this.props.styles;
    return (

        <View style={[margin, styles.background]}>
          { isLoading && this.renderListLoading()}
          { !isLoading  && this.renderList(dataSource)}
        </View>

     )
  }
}
const styles = EStyleSheet.create({
    loadingText:{
      color:'white',
      alignSelf:'center'
    },
    contentContainer:{
  		/*marginTop:Global.NAVIGATION_BAR_HEIGHT,*/
  	},
    background:{
      backgroundColor:Global.BACKGROUND_COLOR
    },
    navigationTitle:{
      color:'white'
    },
    list:{
      /*flex:1,
      flexBasis:1,*/
      /*height:620,
      flexBasis:1,*/
      height:620,
  
    },
    emptyText:{
      color:'white',
      alignSelf:'center',
      margin:15,
    }
});

/*list State Name is mapping to presentation[listStateName] to fetch specific array instance for listview
    state : {
        presentation:{
          gameLikes:[],
          studioLikes:[].
          games:[],
          studios:[]
        }
    }
*/
function mapStateToProps(state, ownProps){

  const listStateName = ownProps.listStateName;
  const {isLoading} = state.presentation;
  const list = state.presentation[listStateName];
  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  const dataSource = ds.cloneWithRows(list);
  /*console.warn('mapStateToProps');*/
  //console.warn('listStateName', isLoading, listStateName, list.length);
  return {
    dataSource,
    list,
    isLoading
  }
}
export default connect(mapStateToProps)(ItemListView);
