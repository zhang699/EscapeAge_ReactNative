

const GAME = 'GAME';


const SITE_SUB_GAME = "game";
const SITE_SUB_STUDIO = "studio";
const SITE_SUB_USER = "users";
const SITE_SUB_PLAYED = "played";
const SITE_SUB_NEWS = "news";

const STATUS = "123";

const GAME_STATUS = {
	TAG_NEW : "8",
	TAG_ABOUT_TO_OPEN : "7",
	TAG_NORMAL : "6",
	TAG_CLOSED : "0"
}
export default {
	FIREBASE : {
		KEY:{
			LIKES:'likes',
			PLAYEDS:'playeds',
			USER_ID:'userId',
			GAME_LIKES:'game_likes',
			STUDIO_LIKES:'studio_likes',
			STUDIO_ID:'studioId',
			NEWS_READ: 'news_read',
		},
		GAME,
		SITE_SUB_GAME,
		SITE_SUB_STUDIO,
		SITE_SUB_USER,
		SITE_SUB_PLAYED,
		SITE_SUB_NEWS
	},
	GAME_STATUS,
	NEW_GAME_PERIOD_IN_MONTHS:2,   // opened within 2 months, show new flag
	DATE:{
		PICKER_DATE_FORMAT:'YYYY/MM/DD',
		SELECTED_CALENDAR_FORMAT:'YYYY-MM-DD'
	}
}
