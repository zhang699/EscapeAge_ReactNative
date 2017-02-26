
import { Platform, StyleSheet } from 'react-native';
//Navigation bar height = statusBar + TitleBar
const NAVIGATION_BAR_HEIGHT = (Platform.OS === 'ios'? 64 : 54) ;
const TAB_BAR_HEIGHT = 86; /*80*/
const BACKGROUND_COLOR='#0d161d'
export default {
	NAVIGATION_BAR_HEIGHT,
	STATUS_BAR_HEIGHT:20,
	TAB_BAR_HEIGHT,
	BACKGROUND_COLOR,
	contentContainer:{
		marginTop:NAVIGATION_BAR_HEIGHT,
		backgroundColor:BACKGROUND_COLOR
	}
}
