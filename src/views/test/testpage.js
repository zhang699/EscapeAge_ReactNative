

import React, {Component} from 'react';

import {
  TextInput,
  Text,
  View,
  ScrollView
} from 'react-native'
import {Button} from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import ModalPicker from 'react-native-modal-picker'
import Areas from '../../model/utils/areas';
import {
  LoadingAnimation,
  FeedbackModal,
  AddToFavoriteAnimation,
  SortingByTypeModal,
  AreaSortableListView,
  ContentContainer,
  TestComponents,
  RatingAndPickDateModal,
} from '../components'

class TestPage extends Component{
  state={
    open:false,
  }

  constructor(props){
    super(props);
    const areas = new Areas();
    const areasArr = areas.getDisplayAreas();
    this.state.areaSettings = areas;
    this.state.areas = areasArr;
    this.state.order = Object.keys(areasArr);

    this.state.i = 0;
  }
  onPress(){
    this.setState({
      open:true
    })
  }
  onCancelPress(response){
    /*console.warn('what is this', this.constructor.name, response);*/
    this.closeModal();
  }
  onConfirmPress(response){
    /*console.warn('onConfirmPress');
    console.warn('what is this', this.constructor.name, response);*/
    this.closeModal();
  }
  closeModal(){
    this.setState({
      open:false
    })
  }

  textChanged(text){
    console.warn('text', text);
  }
  onAnimationDone(isFinal){
    //console.warn('isFinalAnimation', isFinal);
  }

  onAddToFavoritePress(isPress){
    console.warn('onAddToFavoritePress', isPress);
  }

  onSortingDialogPress(){
    this.setState({
      sortingDialogOpened:true
    })
  }
  onAreaSortingDialogPress(){
    this.setState({
      areaSortingDialogOpened:true,
    })
  }
  onPressRender(){
    this.setState({
      i: this.state.i,
    })
  }

  onRatingPickerDialogPress(){
    this.setState({
      ratingPickDateDialogOpen:true
    })
  }
  render(){
    const MAX_LENGTH = 140;
    const cancelButton = {
      text:'取消',
      onPress:this.onCancelPress.bind(this)
    }
    const confirmButton = {
      text:'確認',
      onPress : this.onConfirmPress.bind(this)
    }
    return (
      <ContentContainer isBelowOfStatusBar>
        <ScrollView>



          <Button onPress={this.onPressRender.bind(this)} title={'點擊刷新'}></Button>
          {/*<TestComponents test={this.state.i}></TestComponents>
          <AreaSortableListView
            data={this.state.areas}
            order={this.state.order}
            onMovedResult={(result)=>{
              this.state.areaSettings.applyAreaSettings(result);
            }}>

          </AreaSortableListView>*/}

          <View style={styles.button}>
            <Button onPress={this.onPress.bind(this)} title={'按我開App回報Dialog'}></Button>
          </View>
          <View style={styles.button}>
            <Button
              onPress={this.onRatingPickerDialogPress.bind(this)}
              title={'按我開RatingPickerDateDialog'}></Button>
          </View>
          <LoadingAnimation
            style={styles.loadingAnimation}
            onAnimationDone={this.onAnimationDone.bind(this)}>

          </LoadingAnimation>


          <View style={styles.button}>
            <Button onPress={this.onSortingDialogPress.bind(this)} title={'按我開排序Dialog'}></Button>
          </View>


          <View style={styles.button}>
            <Button onPress={this.onAreaSortingDialogPress.bind(this)} title={'按我開地區排序Dialog'}></Button>
          </View>



          <AddToFavoriteAnimation  style={styles.addToFavoriteButton} onPress={this.onAddToFavoritePress.bind(this)}></AddToFavoriteAnimation>
          <RatingAndPickDateModal
            cancelButton={cancelButton}
            open={this.state.ratingPickDateDialogOpen}
            modalDidClose={this.closeModal.bind(this)}
            title={'確認Dialog'}
            confirmButton={confirmButton}>
          </RatingAndPickDateModal>

          <SortingByTypeModal
            cancelButton={cancelButton}
            confirmButton={confirmButton}
            title={'排序'}
            open={this.state.sortingDialogOpened}>
          </SortingByTypeModal>
          <FeedbackModal
            cancelButton={cancelButton}
            open={this.state.open}
            modalDidClose={this.closeModal.bind(this)}
            title={'確認Dialog'}
            confirmButton={confirmButton}>
          </FeedbackModal>


        </ScrollView>
      </ContentContainer>
    )
  }
}

const styles=EStyleSheet.create({
  container:{
    height:520
  },
  loadingAnimation:{
    width:32,
    height:32
  },
  addToFavoriteButton:{
    width:24,
    height:24
  },
  button:{
    marginTop:100
  }
})
export default TestPage;
