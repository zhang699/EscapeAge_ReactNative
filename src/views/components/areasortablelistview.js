
import React, {Component} from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  StyleSheet,
  Image
} from 'react-native';
import SortableListView from 'react-native-sortable-listview';
import {
  Drawables,
  Colors,
} from '../values/'
/**
  data must be
  {
    text :<displayName>,
    token : <tokenName>
  }
*/

class AreaSortableListView extends Component {
  renderRow(item){
    const icon_headline = Drawables.icon_headline;

    return (
      <TouchableHighlight
        underlayColor={Colors.dragsort_cache}
        delayLongPress={100}
        style={styles.item}
        {...this.props.sortHandlers}>
        <View style={styles.dragItem}>
          <Image style={styles.headline} source={icon_headline}></Image>
          <Text style={styles.itemText}>{item.text}</Text>
        </View>
      </TouchableHighlight>
    )
  }
  render(){
    const {data, order, onMovedResult=function(){}} = this.props;
    const {listviewStyle} = this.props;
    return (
      <SortableListView
        scrollEnabled={false}
        style={[styles.listview, listviewStyle]}
        data={data}
        order={order}
        onRowMoved={e => {
          order.splice(e.to, 0, order.splice(e.from, 1)[0]);
          const result = order.map((itemIdx)=>{
            return data[itemIdx].token;
          })
          onMovedResult(result);
          this.forceUpdate();
        }}
        renderRow={this.renderRow.bind(this)}/>
    )
  }
}

const styles = StyleSheet.create({
  listview:{
    flex:1,
    height:520,
  },
  item:{
    padding: 5,
    backgroundColor: "#F8F8F8",
    borderBottomWidth:1,
    borderColor: '#eee',
  },
  dragItem:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center'
  },
  itemText:{
    marginLeft:10,
  },
  headline:{
    width:24,
    height:24,
    tintColor:Colors.app_gray
  }
})

export default AreaSortableListView;
