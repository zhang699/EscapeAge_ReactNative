
import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import {Actions} from 'react-native-router-flux';

import {connect} from 'react-redux';

import {
  Colors,
  Strings,
  Drawables
} from '../values';

import {
  IconTitleView,
  AddressMapView,
  ContentContainer,
  DetailInfoText,
  Avatar,
  Divider,
  ItemListView,
  DetailNavMenuBar,
  LoadingAnimation,
  TouchableHighlightWrapper,
  GameItem,
  AddToFavoriteAnimation,
} from '../components'

import {store} from '../../model/main';

import {
  fetchGamesByStudioId,
  toggleStudioLike,
  fetchStudioDetailPage,
} from '../../model/presentation/presentationActions';



/*const TEST_STUDIO ={
  address: '台北市士林區中山北路七段14巷19-1號',
  area: 'area_tp',
  facebook: 'https://www.facebook.com/XcapeTaiwan',
  id: 'nUU2aJo7dr',
  likes: 1,
  name: 'Xcape Taiwan 實境密室脫逃',
  nameQuery: 'xcape taiwan 實境密室脫逃',
  phone: '02-2872-1157',
  photoUrl: 'https://i.imgur.com/BIs046i.jpg',
  views: 61,
  website: 'https://www.xcapetaiwan.com/'
}*/

class StudioDetail extends Component {

  constructor(props){
    super(props);
    this.menuOptions = [
      Strings.download_img,
      Strings.feedback_correction,
    ]
    this.onAddToFavoriteBtnPress = this.onAddToFavoriteBtnPress.bind(this);
  }
  onFacebokLinkPress(){
  }
  onHomePagePress(){
  }
  onPhoneNumberPress(){
  }
  componentWillMount(){
    const {studio} = this.props;
    store.dispatch(fetchGamesByStudioId(studio.id));
    store.dispatch(fetchStudioDetailPage(this.props.studio));
  }
  onItemPress(game){
    Actions.game({
      game
    })
  }
  renderGameItemRow(game){
    return (
      <TouchableHighlightWrapper
        onPress={this.onItemPress.bind(this, game)}>
          <GameItem game={game}></GameItem>
      </TouchableHighlightWrapper>
    )
  }

  onAddToFavoriteBtnPress(){
    const {id} = this.props.studio;
    store.dispatch(toggleStudioLike(id))
  }

  renderLoading(){
    return (
      <ContentContainer isWrapMenuContext={true} isBelowOfStatusBar={true} layoutStyle={styles.contentLayout}>
        <LoadingAnimation/>
      </ContentContainer>
    )
  }
  isLoading(studio){
    return !studio ;
  }
  render(){
    const {isLoading, studio, isExecutingRequest} = this.props.studioDetailPage;
    if (this.isLoading(studio)){
      return this.renderLoading();
    }


    const phoneImage = Drawables.icon_info_phone;
    const fansPageImage = Drawables.icon_info_fb;
    const homePageImage = Drawables.icon_info_home;
    const addressImage = Drawables.icon_info_location;

    const viewImage = Drawables.icon_info_location;
    const favoriteImage = Drawables.icon_like;
    return (
      <ContentContainer isWrapMenuContext isBelowOfStatusBar layoutStyle={styles.contentLayout}>
        <ScrollView contentContainerStyle ={styles.studioContainer}>

          <DetailNavMenuBar menuOptions={this.menuOptions}></DetailNavMenuBar>
          <Avatar  radius={50} style={styles.studioPhoto} source={{uri:studio.photoUrl}}></Avatar>
          <View style={styles.studioInteractionInfo}>
            <DetailInfoText textLayoutStyle={styles.interactionTextLayout} image={viewImage} text={studio.views}></DetailInfoText>
            <DetailInfoText textLayoutStyle={styles.interactionTextLayout} containerStyle={styles.interactionItemContainer} image={favoriteImage} text={studio.likes}></DetailInfoText>
          </View>
          <Text style={styles.studioName}>{studio.name}</Text>
          <Divider style={styles.divider}></Divider>
          <View style={styles.addToFavoriteContainer}>
            <AddToFavoriteAnimation
              isFavorite={studio.isUserLiked}
              disabled={isExecutingRequest}
              style={styles.addToFavoriteButton}
              onPress={this.onAddToFavoriteBtnPress}>
            </AddToFavoriteAnimation>
          </View>

          <AddressMapView address={studio.address}></AddressMapView>

          <View style={styles.mapContainer}></View>
          <View style={styles.studioDetailInfo}>

            <DetailInfoText
              image={addressImage}
              text={studio.address}>

            </DetailInfoText>
            <DetailInfoText
              onPress={this.onPhoneNumberPress.bind(this)}
              image={phoneImage}
              text={studio.phone ? studio.phone : Strings.phone_empty}>
            </DetailInfoText>

            <DetailInfoText
              onPress={this.onFacebokLinkPress.bind(this)}
              image={fansPageImage}
              text={Strings.game_facebook}>
            </DetailInfoText>

            <DetailInfoText
              onPress={this.onHomePagePress.bind(this)}
              image={homePageImage}
              text={Strings.game_website}>
            </DetailInfoText>
          </View>

          <Divider style={styles.divider}></Divider>
          <View>
            <IconTitleView text={Strings.game}></IconTitleView>
              <ItemListView
                loadingComponent={()=>{
                  return (<LoadingAnimation></LoadingAnimation>);
                }}
                isFullScreen={false}
                renderRow={this.renderGameItemRow.bind(this)}
                listStateName={'gamesByStudioId'}>
              </ItemListView>

          </View>
        </ScrollView>
      </ContentContainer>
    )
  }
}

const styles = EStyleSheet.create({
  addToFavoriteButton:{
    width:24,
    height:24,
  },
  addToFavoriteContainer:{
    height:30,
    margin:15,
    flexDirection:'row',
    justifyContent:'flex-end',
    width:'90%',
  },
  studioPhoto:{
    backgroundColor:'transparent'
  },
  studioInteractionInfo:{
    flexDirection:'row',
    justifyContent:'center',
    alignSelf:'center',
    marginTop:20
  },
  interactionItemContainer:{
    marginLeft:10
  },
  interactionTextLayout:{
    marginLeft:5,
  },
  studioDetailInfo:{
    alignItems:'flex-start',
    width:'90%'
  },
  studioName:{
    color:Colors.primary,
    fontWeight:'900'
  },
  divider:{
    marginTop:25
  },

  mapContainer:{
    marginVertical:10
  },
  studioContainer:{
    marginTop:20,
    flexDirection:'column',
    alignItems:'center',
  }
})

function mapStateToProps(state, ownProps) {
  const {studioDetailPage} = state.presentation
  return {
    studioDetailPage
  }
}
export default connect(mapStateToProps)(StudioDetail);
