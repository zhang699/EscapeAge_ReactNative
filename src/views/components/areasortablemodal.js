
import React, {Component} from 'react';
import {ConfirmModal, AreaSortableListView} from './';
import {StyleSheet} from 'react-native';
import {Strings} from '../values';
import Areas from '../../model/utils/areas';

class AreaSortableModal extends Component {
  constructor(props){
    super(props);

    const areas = new Areas(this.props.areas);
    const areasArr = areas.getDisplayAreas();
    this.state = {
      areaSettings:areas,
      areas:areasArr,
      order:Object.keys(areasArr)
    };
    /*this.state.areaSettings = areas;
    this.state.areas = areasArr;
    this.state.order = Object.keys(areasArr);*/
  }
  render(){
    const {modalDidClose, open, onMovedResult} = this.props;
    const modal = {
      modalDidClose,
      open
    }
    const {listviewStyle} = this.props;
    return (
      <ConfirmModal title={Strings.sort_area} modal={modal} {...this.props} containerStyle={styles.containerStyle}>
        <AreaSortableListView
        listviewStyle={[listviewStyle, styles.areaListViewStyle]}
        data={this.state.areas}
        order={this.state.order}
        onMovedResult={onMovedResult}>
        </AreaSortableListView>
      </ConfirmModal>
    )
  }
}

const styles = StyleSheet.create({
  containerStyle:{

  },
  areaListViewStyle:{
    width:250
  },
})
export default AreaSortableModal;
