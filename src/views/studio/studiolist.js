
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
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import { connect, Provider } from 'react-redux'
import {
  fetchGameList,
  fetchStudioList,
  sortStudioListByType,
  searchStudioListByText,
} from '../../model/presentation/presentationActions';
import {store} from '../../model/main';
import {
  StudioItem,
  ContentContainer,
  SearchMenuBar,
  TouchableHighlightWrapper,
  LoadingAnimation,
  menuSortList,
} from '../components/';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ItemListView from '../components/itemlistview';
import {Drawables, Strings} from '../values';
import {Actions} from 'react-native-router-flux';

import {
  persistStudioListSortOrder,
  persistStudioSortAreas,
} from '../../model/persist/persistActions';

class Studios extends Component{

    constructor(props){
      super(props);
      this.state = {}
    }
    componentWillReceiveProps(nextProps){
      const {action} = nextProps;
      if (!action){
        return;
      }
      if (action.actionType === 'sortType'){
        const {sortByTypeOption} = action;
        store.dispatch(persistStudioListSortOrder(sortByTypeOption));
        store.dispatch(sortStudioListByType(sortByTypeOption));
      } else if (action.actionType === 'areaSort'){
        const {sortByTypeOption, areas} = action;
        store.dispatch(persistStudioSortAreas(areas));
        store.dispatch(sortStudioListByType(sortByTypeOption));
      }
    }

    componentWillMount(){
      store.dispatch(fetchStudioList());
    }

    onItemPress(studio){
      Actions.studio({studio});
    }

    renderRow(studio){
      return (
        <TouchableHighlightWrapper
          onPress={this.onItemPress.bind(this, studio)}>
            <StudioItem containerStyle={styles.studioItemContainer} studio={studio}></StudioItem>
        </TouchableHighlightWrapper>
      )
    }
    textChanged(text){
      store.dispatch(searchStudioListByText(text));
    }

    render(){
      const sortByArea = Strings.sort_area;
      const sortByStudio = Strings.sort_studio;
      return (
        <View>
          <SearchMenuBar
            textChanged={this.textChanged.bind(this)}
            menu={{onSelect:this.props.onMenuSelect}}
            options={[sortByArea, sortByStudio]}>
          </SearchMenuBar>
          <ItemListView
            isFullScreen={true}
            loadingComponent={()=>(<LoadingAnimation/>)}
            renderRow={this.renderRow.bind(this)}
            listStateName={'studioList'}/>

        </View>
      )
    }
}
const styles = EStyleSheet.create({
    navigationTitle:{
        color:'white'
    },
    studioItemContainer:{
      marginTop:10
    }
});

export default menuSortList(Studios, {
  radioItems: [
    {label: Strings.sort_popularity, value: 0 },
    {label: Strings.sort_studio_name, value: 1 },
  ],
  controlModal:{
    0 : 'areaSortableDialogOpen',
    1 : 'sortByTypeDialogOpen',
  },
  initial:()=>{
    const {persist} = store.getState();
    return {
      sortByTypeOption: persist.studiolistSortType,
      areas:persist.studioAreas,
    }
  }
});
