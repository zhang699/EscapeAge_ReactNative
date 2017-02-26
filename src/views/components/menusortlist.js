
import React, {Component} from 'react';
import {
  Strings,
} from '../values'
import {
  SortingByTypeModal,
  AreaSortableModal,
  ContentContainer,
} from './';
export default (WrappedComponent, options)=>{
  return class SearchSortList extends Component {

    constructor(props){
      super(props);
      this.confirmButton={
        text:Strings.ok,
        onPress:this.onSortByTypeConfirmButtonPress.bind(this)
      }
      this.cancelButton={
        text:Strings.cancel,
        onPress:this.onSortByTypeCancelButtonPress.bind(this)
      }

      this.confirmAreaSortButton = {
        text:Strings.ok,
        onPress:this.onAreaSortConfirmButtonPress.bind(this),
      }

      this.cancelAreaSortButton = {
        text:Strings.cancel,
        onPress:this.onAreaSortCancelButtonPress.bind(this)
      }
      const initialVals = options.initial();
      this.state = {
        ...options,
        action:{
          sortByTypeOption:initialVals['sortByTypeOption'],
          areas:initialVals['areas'],
        },
      }

      this.onMenuSelect = this.onMenuSelect.bind(this);
    }
    onSortByTypeConfirmButtonPress(){
      this.controlModal('sortByTypeDialogOpen', false);
      const {sortByTypeOption} =  this.state.action;
      this.setState({
        action: {
          sortByTypeOption,
          actionType:'sortType'
        },
      })
    }

    onMenuSelect(option){
      var controlProp = this.state.controlModal[option];
      this.controlModal(controlProp, true);
    }

    onSortByTypeCancelButtonPress(){
      this.controlModal('sortByTypeDialogOpen', false);
    }
    onAreaSortCancelButtonPress(){
      this.controlModal('areaSortableDialogOpen', false);
    }
    onAreaSortConfirmButtonPress(){
      this.controlModal('areaSortableDialogOpen', false);
      const {sortByTypeOption, areas} =  this.state.action;
      this.setState({
        action:{
          actionType:'areaSort',
          areas:areas,
          sortByTypeOption,
        }
      })
    }
    onRadioSortTypeButtonPress(value){
      //this.controlModal('sortByTypeDialogOpen', false);
      this.setState({
        action:{
          sortByTypeOption:value,
        }
      })
    }

    sortingModalDidClose(){
      this.controlModal('sortByTypeDialogOpen', false);
    }

    areaSortingModalDidClose(){
      this.controlModal('areaSortableDialogOpen', false);
    }
    onAreaMoveResult(areas){
      this.setState({
        action:{
          areas,
        }
      })
    }
    controlModal(propName, value){
      this.setState({
        [propName]:value
      })
    }

    render(){
      return (
        <ContentContainer isWrapMenuContext isBelowOfStatusBar paddingHorizontal={5}>
          <WrappedComponent onMenuSelect={this.onMenuSelect} action={this.state.action}/>
          <SortingByTypeModal
            title={Strings.sort}
            initial={this.state.action.sortByTypeOption}
            modal={
            {open:this.state.sortByTypeDialogOpen,
            modalDidClose:this.sortingModalDidClose.bind(this)}}
            onRadioButtonPress={this.onRadioSortTypeButtonPress.bind(this)}
            radioItems={this.state.radioItems}
            confirmButton={this.confirmButton}
            cancelButton={this.cancelButton}/>

          <AreaSortableModal
              modal={
              {open:this.state.areaSortableDialogOpen,
              modalDidClose:this.areaSortingModalDidClose.bind(this)}}
              areas={this.state.action.areas}
              confirmButton={this.confirmAreaSortButton}
              onMovedResult={this.onAreaMoveResult.bind(this)}
              cancelButton={this.cancelAreaSortButton}>

          </AreaSortableModal>
        </ContentContainer>
      )
    }
  }
}
