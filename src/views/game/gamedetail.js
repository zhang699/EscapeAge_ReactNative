
import React, {Component} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  Text,
  View,
  WebView,
  ScrollView,
  StatusBar,
  Linking,
  TouchableHighlight,
} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import {MenuContext} from 'react-native-menu';
import {connect, Provider } from 'react-redux'
import Toast from '@remobile/react-native-toast';
import {Colors, Strings, Drawables} from '../values';
import {
  ContentContainer,
  Divider,
  GameImageBanner,
  IconButton,
  IconText,
  StudioItem,
  RoundedImageButton,
  WebViewAutoHeight,
  GameStarRating,
  ImageClickableText,
  AddressMapView,
  DetailInfoText,
  AddToFavoriteAnimation,
  DetailNavMenuBar,
  RatingAndPickDateModal,
  LoadingAnimation,
} from '../components';
import {
  fetchGameDetailPage,
  toggleGameLike,
  createPlayedRecord} from '../../model/presentation/presentationActions';

import {store} from '../../model/main';




class GameDetail extends Component {

  constructor(props){
    super(props);
    this.menuOptions = [
      Strings.organize_team,
      Strings.add_to_calendar,
      Strings.add_to_played,
      Strings.download_img,
      Strings.feedback_correction
    ];

    this.onRatingPress = this.onRatingPress.bind(this);
  }

  onRatingPress(){
    const {game} = this.props.gameDetailPage;
    if (!game.played){
      Toast.showShortBottom(Strings.rating_required);
    } else {
        this.openRatingPickerDateDialog(true)
    }
  }
  componentWillMount(){
    this.state = {
      ratingPickerDateDialogOpen:false
    }
    store.dispatch(fetchGameDetailPage(this.props.game));
  }
  onWebsiteLinkPress(websiteUrl){
    console.warn('onWebsiteLinkPress', websiteUrl)
    Linking.openURL(websiteUrl);
  }
  onFacebokLinkPress(fbUrl){
    console.warn('onFacebokLinkPress', fbUrl)
    Linking.openURL(fbUrl);
  }

  onYoutubeLinkPress(youtubeUrl){
    console.warn('onFacebokLinkPress', youtubeUrl)
    Linking.openURL(youtubeUrl);
  }
  onFavoriteBtnPress(){

  }

  onStarRatingPress(rating){
    console.warn('onStarRatingPress', rating);
  }

  onReservedButtonPress(game){
    console.warn('onReservedButtonPress');
    const bookingUrl = game.url;
    if (bookingUrl){
      Linking.openURL(bookingUrl);
    }else{
      const studio = game.studioObj;
      Linking.openURL(studio.facebook);
    }
  }

  onPhoneNumberPress(){
    console.warn('onPhoneNumberPress');
  }
  onGoToGamePress(){

  }
  onFansPagePress(url){
    console.warn('onFansPagePress');
    Linking.openURL(url);
  }
  onHomePagePress(homePageUrl){
    Linking.openURL(homePageUrl);
  }
  onAddToCalendarPress(){

  }

  onAddToFavoriteBtnPress(){
    console.warn('onAddToFavoriteBtnPress');
    const {id} = this.props.gameDetailPage.game;
    store.dispatch(toggleGameLike(id));
  }

  isUrlAvailable(url){
    return url !== '';
  }
  isLoading(game){
    return this.props.isLoading || !game ||  Object.keys(game).length == 0
  }

  checkBookingBorderColor(){

  }

  checkBookingBackgroundColor(){

  }

  onRatingPickerDateDialogConfirmPress(){
    this.openRatingPickerDateDialog(false)

    var config = this.checkRatingPickerDateDialogConfiguration()

    const gameId = this.props.gameDetailPage.game.id;
    const {
      star=config.star,
      date=config.date,
      isEscapeSuccess=config.switchValue} = this.state;

    const playedRecord = {
      star,
      date,
      isEscapeSuccess
    }
    console.warn('playedRecord', playedRecord);
    store.dispatch(createPlayedRecord(gameId, playedRecord))
  }
  onRatingPickerDateDialogCancelPress(){
    this.openRatingPickerDateDialog(false)
  }
  openRatingPickerDateDialog(isOpen){
    this.setState({
      ratingPickerDateDialogOpen:isOpen
    })
  }
  onAlreadyPlayedPress(){
    this.openRatingPickerDateDialog(true);
  }
  onRatingPickerDateDialogModalDidClose(){
    this.openRatingPickerDateDialog(false)
  }
  onRatingPickerDateStarRatingPress(star){
    this.setState({
      star:star
    })
  }
  onSwitchValueChanged(value){
    this.setState({
      isEscapeSuccess:value
    })
  }

  onDateSelect(date){
    console.warn('gamedetail.onDateSelect', date);
    this.setState({
      date
    })
  }
  checkRatingPickerDateDialogConfiguration(){
    const {game} = this.props.gameDetailPage;
    const played = game.played;

    let dialogInitialVal = {
      switchValue : true,
      star: 3,
      showPlayedOptionsOnly:true,
    }
    const isAlreadyPlayed = played != null;
    if (isAlreadyPlayed){
      dialogInitialVal = {
        switchValue:played.playedResult === 'success',
        date : played.playedDate,
        star : played.displayRate,
        showPlayedOptionsOnly:false,
      }
    }
    console.warn('dialogInitialVal', dialogInitialVal, isAlreadyPlayed);
    return dialogInitialVal;
  }
  getRatingPickerDateDialogProps(){
    const {game} = this.props.gameDetailPage;
    const {played} = game;
    let dialogInitialVal = this.checkRatingPickerDateDialogConfiguration();
    return {
      confirmButton : {onPress:this.onRatingPickerDateDialogConfirmPress.bind(this), text:Strings.ok},
      cancelButton: {onPress:this.onRatingPickerDateDialogCancelPress.bind(this), text:Strings.cancel},
      open:this.state.ratingPickerDateDialogOpen,
      modalDidClose:this.onRatingPickerDateDialogModalDidClose.bind(this),
      onSwitchValueChanged:this.onSwitchValueChanged.bind(this),
      onDateSelect:this.onDateSelect.bind(this),
      onStarRatingPress:this.onRatingPickerDateStarRatingPress.bind(this),
      ...dialogInitialVal
    }
  }

  getReservedButtonProps (game){
    const noops = ()=>{};
    const isClosed =  game.isClosed;
    const isAboutToOpen = game.isAboutToOpen;
    const primaryColor = isClosed ? Colors.button_red : (isAboutToOpen ? Colors.button_green : Colors.primary);
    return {
      borderColor: primaryColor,
      backgroundColor: primaryColor,
      buttonText: isClosed ? Strings.closed : (isAboutToOpen ? Strings.about_to_open : Strings.book),
      containerStyle: styles.reservedButtonContainer,
      onPress: isClosed ? noops : this.onReservedButtonPress.bind(this, game),
    }
  }
  renderLoading(){
    return (
      <ContentContainer isWrapMenuContext={true} isBelowOfStatusBar={true} paddingHorizontal={0} layoutStyle={styles.contentLayout}>
        <LoadingAnimation/>
      </ContentContainer>
    )
  }
  render(){
    const {isLoading, game} = this.props.gameDetailPage;
    if (this.isLoading(game)){
      return this.renderLoading();
    }

    const studio = game.studioObj;
    const mapAddress = game.address || studio.address;
    const title = game.name;
    //const mapAddress = game.address || studio.address;
    const gameVote = game.vote || 0;
    const numberOfLikes =  game.likes < 0 ? 0 : game.likes;
    const photoUrl = game.photoUrl;
    const websiteUrl = game.website;
    const youtubeUrl = game.youtube;
    const fbUrl = studio.facebook;
    //console.warn('urls', websiteUrl, youtubeUrl, fbUrl);

    const alreadyPlayText = Strings.add_to_played ;
    const reservedText = Strings.book;
    const goToGameText = Strings.organize_team;
    const addToCalendarText = Strings.add_to_calendar;
    const gameHomeText = Strings.game_website;
    const fansPageText = Strings.game_facebook;

    const voteText = `${Strings.rating} (${gameVote})`;
    const gameTimeText = `${game.gameTime} ${Strings.game_time}`;
    const gameLimitText = `${game.limit} ${Strings.game_people}`;
    const gameIntroHtmlContent = game.introduction;


    const wrapedGameIntroHtml = `<body>${gameIntroHtmlContent}</body>`

    const addressImage = Drawables.icon_info_location
    const limitImage = Drawables.icon_info_people
    const timeImage = Drawables.icon_info_time;
    const phoneImage = Drawables.icon_info_phone;
    const fansPageImage =Drawables.icon_info_fb;
    const homePageImage = Drawables.icon_info_home;
    const addToCalendarImage = Drawables.icon_info_add;
    const goToGameImage = Drawables.icon_info_share;

    const isWebSiteUrlAvailable = this.isUrlAvailable(websiteUrl);
    const isFBUrlAvailable = this.isUrlAvailable(fbUrl);
    const isYoutubeUrlAvailable = this.isUrlAvailable(youtubeUrl);
    return (
      <ContentContainer isWrapMenuContext={true} isBelowOfStatusBar={true} paddingHorizontal={0} layoutStyle={styles.contentLayout}>
        <ScrollView>
          <GameImageBanner photoUrl={photoUrl} bannerStyle={styles.banner} bannerOverlayStyle={styles.bannerOverlay}>

            <DetailNavMenuBar menuOptions={this.menuOptions}></DetailNavMenuBar>
            <View style={{flex:1}}></View>
            <View style={styles.bannerInfo}>
              <View style={styles.socialLinks}>
                  {isWebSiteUrlAvailable&& <IconButton name='home' onPress={this.onWebsiteLinkPress.bind(this, websiteUrl)}></IconButton>}
                  {isFBUrlAvailable && <IconButton name='facebook' onPress={this.onFacebokLinkPress.bind(this, fbUrl)}></IconButton>}
                  {isYoutubeUrlAvailable && <IconButton name='youtube-play' onPress={this.onYoutubeLinkPress.bind(this, youtubeUrl)}></IconButton>}
              </View>
              <View style={{flex:1}}></View>
              <IconText style={styles.iconTextWrapper} icon={{name:'favorite'}} text={numberOfLikes}></IconText>
            </View>

          </GameImageBanner>

          <View style={styles.content}>
              <StudioItem
                containerStyle={styles.studioContainerStyle}
                subTitleStyle={styles.studioSubTitle}
                title={title}
                titleStyle={styles.studioTitle}
                studio={studio}>

                {/*<IconButton  iconStyle={styles.favoriteIcon} name='favorite' onPress={this.onFavoriteBtnPress.bind(this)}></IconButton>*/}

                <AddToFavoriteAnimation
                  isFavorite={game.isUserLiked}
                  style={styles.addToFavoriteButton}
                  disabled={this.props.gameDetailPage.isExecutingRequest}
                  onPress={this.onAddToFavoriteBtnPress.bind(this)}>

                </AddToFavoriteAnimation>
              </StudioItem>

              <RoundedImageButton
                onPress={this.onAlreadyPlayedPress.bind(this)}
                buttonText={alreadyPlayText}
                containerStyle={styles.roundedImageButtonContainer}
                overlayOnly={true}
                image={{
                  source:Drawables.icon_played_white
                }}>

              </RoundedImageButton>

              <Divider style={styles.divider}></Divider>

              <View style={styles.webviewContainer}>
                <WebViewAutoHeight
                  style={styles.webViewContent}
                  contentCSS={{backgroundColor:Colors.primary_dark, color:'white'}}
                  source={{html:wrapedGameIntroHtml}}/>
              </View>

              <Divider style={styles.divider}></Divider>
              <TouchableHighlight onPress={this.onRatingPress}>
                <View  style={styles.voteRatingContainer}>
                  <Text style={styles.voteText}>{voteText}</Text>
                  <View pointerEvents={'none'}>
                    <GameStarRating emptyStarColor={Colors.primary} starRatingContainerStyle={styles.starRatingContainer} onPress={this.onStarRatingPress.bind(this)}/>
                  </View>
                </View>
              </TouchableHighlight>

              <View style={styles.mapContainer} >
                  <AddressMapView address={mapAddress}></AddressMapView>
              </View>

              <View style={styles.detailInfoContainer}>

                <DetailInfoText image={addressImage} text={mapAddress}></DetailInfoText>
                <View style={styles.gamePlayInfoContainer}>
                  <DetailInfoText image={limitImage} text={gameLimitText}></DetailInfoText>
                  <DetailInfoText image={timeImage} text={gameTimeText}></DetailInfoText>
                </View>
                <DetailInfoText
                  onPress={this.onPhoneNumberPress.bind(this)}
                  image={phoneImage}
                  text={studio.phone}>
                </DetailInfoText>

                <DetailInfoText
                  onPress={this.onFansPagePress.bind(this, fbUrl)}
                  image={fansPageImage}
                  text={fansPageText}>
                </DetailInfoText>

                {isWebSiteUrlAvailable && <DetailInfoText
                  onPress={this.onHomePagePress.bind(this, websiteUrl)}
                  image={homePageImage}
                  text={gameHomeText}>
                </DetailInfoText>}

                <DetailInfoText
                  onPress={this.onAddToCalendarPress.bind(this)}
                  image={addToCalendarImage}
                  text={addToCalendarText}>

                </DetailInfoText>
                <DetailInfoText
                  onPress={this.onGoToGamePress.bind(this)}
                  image={goToGameImage}
                  text={goToGameText}>
                </DetailInfoText>

                <RoundedImageButton
                  {...this.getReservedButtonProps(game)}
                />

              </View>

          </View>
        </ScrollView>
        <RatingAndPickDateModal
          {...this.getRatingPickerDateDialogProps()}>
        </RatingAndPickDateModal>
      </ContentContainer>
    )
  }
}

const bannerHeight='34%';
const styles = EStyleSheet.create({

  mapContainer:{
    marginVertical:20,
  },
  studioMapView:{
    width:300,
    height:150
  },
  reservedButtonContainer:{
    width:'90%',
    alignSelf:'center',
    marginTop:20
  },
  gamePlayInfoContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:'50%',
  },
  addToFavoriteButton:{
    width:24,
    height:24,
    alignSelf:'center'
  },
  divider:{
    marginTop:25,
  },
  starRatingContainer:{
    width:200,
    marginTop:10,
  },
  voteRatingContainer:{
    alignItems:'center',
    marginTop:15,
    marginBottom:15,
  },
  voteText:{
    fontSize:20,
    color:'white',
  },
  webViewContent:{
    flex:1,
    marginTop:20,
  },
  webviewContainer:{
    backgroundColor:'transparent',
  },
  roundedImageButtonContainer:{
    marginTop:20,
    alignSelf:'flex-end',
    width:'37%'
  },
  bannerContainer:{
    justifyContent:'flex-end',
    alignItems:'flex-end',
    height:'20%'
  },
  bannerInfo:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'flex-end',
    marginLeft:5,
    paddingBottom:13
  },
  favoriteIcon:{
    backgroundColor:'transparent'
  },
  studioTitle:{
    color:Colors.played_button,
    fontWeight:'900',
    fontSize:22
  },
  studioSubTitle:{
    fontWeight:'bold',
    fontSize:18,
    color:'gray',
    width:'60%',
  },
  content:{
    margin:10
  },
  iconTextWrapper:{
    flexDirection:'row',
    alignItems:'center',
    marginRight:10
  },
  socialLinks:{
    flexDirection:'row',
    justifyContent:'flex-start',
  },
  detailMenuBar:{

  },
  bannerOverlay:{
    backgroundColor:'#00000000',
    height:bannerHeight,
  },
  banner:{
    height:bannerHeight,
    width:'100%',
    resizeMode:'cover',
    borderRadius:0
  },
  contentLayout:{
    marginTop:0,
    marginBottom:0,
    paddingHorizontal:0,
  }
})
function mapStateToProps(state, ownProps){

  const {gameDetailPage} = state.presentation
  console.warn('gameDetailPage', gameDetailPage);
  //onsole.warn('gameDetailPage.isExecutingRequest', gameDetailPage.isExecutingRequest);
  return {
    gameDetailPage,
  }
}

export default connect(mapStateToProps)(GameDetail);
