//ROOT

export const SET_IS_ONLINE = 'SET_IS_ONLINE';
export const SET_TOAST_MASSAGE = 'SET_TOAST_MASSAGE';
export const SET_TOAST_NOTIFICATION = 'SET_TOAST_NOTIFICATION';
export const HIDE_TOAST_NOTIFICATION = 'HIDE_TOAST_NOTIFICATION';
export const HIDE_TOAST = 'HIDE_TOAST';
export const SET_FILTERS = 'SET_FILTERS';
export const SET_NEAREST = 'SET_NEAREST';
export const SET_ACTIVE = 'SET_ACTIVE';
export const SET_TODAY = 'SET_TODAY';
export const SET_THIS_WEEK = 'SET_THIS_WEEK';
export const SET_THIS_MONTH = 'SET_THIS_MONTH';
export const SET_POPULAR = 'SET_POPULAR';
export const GET_APP_VERSION = 'GET_APP_VERSION';
export const SET_APP_STATE = 'SET_APP_STATE';

//REGISTER
export const SET_REGISTER_SCREEN_LOADER_VISIBLE =
  'SET_REGISTER_SCREEN_LOADER_VISIBLE';
export const REGISTER = 'REGISTER';
//LOGIN
export const SET_LOGIN_SCREEN_LOADER_VISIBLE =
  'SET_LOGIN_SCREEN_LOADER_VISIBLE';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const RESET_PASSWORD = 'RESET_PASSWORD';
//USER
export const GET_FIREBASE_TOKEN = 'GET_FIREBASE_TOKEN';
export const GET_USER_INFORMATION = 'GET_USER_INFORMATION';
export const SET_PROFILE_DATA = 'SET_PROFILE_DATA';
export const SET_BLOCKED_USERS = 'SET_BLOCKED_USERS';
export const CHANGE_PASSWORD_NEW_PASSWORD = 'CHANGE_PASSWORD_NEW_PASSWORD';
export const SET_CHANGE_PASSWORD_SCREEN_LOADER_VISIBLE =
  'SET_CHANGE_PASSWORD_SCREEN_LOADER_VISIBLE';
export const EDIT_PROFILE = 'EDIT_PROFILE';
export const SET_UPDATE_DELETE_PROFILE_SCREEN_LOADER =
  'SET_UPDATE_DELETE_PROFILE_SCREEN_LOADER';
export const GET_SETTINGS_SUCCESS = 'GET_SETTINGS_SUCCESS';
export const CHANGE_SETTINGS_REQUEST = 'CHANGE_SETTINGS_REQUEST';
export const SOCIAL_LOGIN = 'SOCIAL_LOGIN';
export const RATE_USER_REQUEST = 'RATE_USER_REQUEST';
export const UPDATE_USER_LOCATION = 'UPDATE_USER_LOCATION';
export const BLOCK_USER = 'BLOCK_USER';
export const GET_BLOCKED_USERS = 'GET_BLOCKED_USERS';
export const UNBLOCK_USER = 'UNBLOCK_USER';
export const GET_USER_LOCATION = 'GET_USER_LOCATION';
export const SET_USER_LOCATION = 'SET_USER_LOCATION';
export const VERIFICATION_REQUEST = 'VERIFICATION_REQUEST';
export const GET_USER_BY_ID = 'GET_USER_BY_ID';
export const GET_TOTAL_COUNT = 'GET_TOTAL_COUNT';
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';
export const CHANGE_EMAIL_SECOND_CODE = 'CHANGE_EMAIL_SECOND_CODE';
export const CHANGE_EMAIL = 'CHANGE_EMAIL';
export const SET_ALLOWED_GEO_LOCATION = 'SET_ALLOWED_GEO_LOCATION';
export const SET_USER_LOADING = 'SET_USER_LOADING';

//EVENTS
export const GET_EVENT_BY_ID = 'GET_EVENT_BY_ID';
export const GET_EVENT_BY_ID_SUCCESS = 'GET_EVENT_BY_ID_SUCCESS';
export const SET_EVENT_SCREEN_SCROLL_LOADER_VISIBLE =
  'SET_EVENT_SCREEN_SCROLL_LOADER_VISIBLE';
export const GET_EVENTS_LIST_DATA = 'GET_EVENTS_LIST_DATA';
export const GET_EVENTS_LIST_DATA_SUCCESS = 'GET_EVENTS_LIST_DATA_SUCCESS';
export const JOIN_EVENT_REQUEST = 'JOIN_EVENT_REQUEST';
export const SEND_REPORT_REASON = 'SEND_REPORT_REASON';
export const UPDATE_EVENT_REQUEST = 'UPDATE_EVENT_REQUEST';
export const DELETE_EVENT_REQUEST = 'DELETE_EVENT_REQUEST';
export const DELETE_EVENT_REQUEST_SUCCESS = 'DELETE_EVENT_REQUEST_SUCCESS';
export const SET_ADD_EVENTS_SCREEN_LOADER_VISIBLE =
  'SET_ADD_EVENTS_SCREEN_LOADER_VISIBLE';
export const CREATE_NEW_EVENT = 'CREATE_NEW_EVENT';
export const SET_EVENT_VIEW_LOADER_VISIBLE = 'SET_EVENT_VIEW_LOADER_VISIBLE';
export const SET_EVENT_LINK = 'SET_EVENT_LINK';
export const GET_TYPES_REQUEST = 'GET_TYPES_REQUEST';
export const GET_TYPES_SUCCESS = 'GET_TYPES_SUCCESS';
export const SEARCH_QUERY_EVENT_LIST = 'SEARCH_QUERY_EVENT_LIST';
export const GET_MEMBERS_LIST_BY_ID = 'GET_MEMBERS_LIST_BY_ID';
export const ACCEPT_EVENT = 'ACCEPT_EVENT';
export const SEND_REQUEST_EVENT = 'SEND_REQUEST_EVENT';
export const OUT_OF_EVENT = 'OUT_OF_EVENT';
export const GET_ALL_JOIN_REQUESTS = 'GET_ALL_JOIN_REQUESTS';
export const REJECT_EVENT = 'REJECT_EVENT';
export const CANCEL_SEND_REQUEST = 'CANCEL_SEND_REQUEST';
export const SAVE_EVENT = 'SAVE_EVENT';
export const SELECTED_EVENT = 'SELECTED_EVENT';
export const CANCEL_EVENT = 'CANCEL_EVENT';
export const SET_EVENT_LOADER = 'SET_EVENT_LOADER';
export const SET_MEMBER_LIST_LOADER = 'SET_MEMBER_LIST_LOADER';
export const SEND_EVENT_COMMENT = 'SEND_EVENT_COMMENT';
export const SET_EVENT_COMMENT = 'SET_EVENT_COMMENT';
export const PUSH_EVENT_COMMENT = 'PUSH_EVENT_COMMENT';
export const SET_REPLY_COMMENT = 'SET_REPLY_COMMENT';
export const SET_BASE_URL = 'SET_BASE_URL';
export const EDIT_EVENT_COMMENT = 'EDIT_EVENT_COMMENT';
export const DELETE_EVENT_COMMENT = 'DELETE_EVENT_COMMENT';
export const FILTER_EVENT_COMMENT = 'FILTER_EVENT_COMMENT';
export const FILTER_REPLY_COMMENT = 'FILTER_REPLY_COMMENT';
export const GET_COMMENT_FROM_EVENT = 'GET_COMMENT_FROM_EVENT';
export const ADD_LIKE_FROM_COMMENT = 'ADD_LIKE_FROM_COMMENT';
export const SET_LIKE_FROM_COMMENT = 'SET_LIKE_FROM_COMMENT';
export const GET_LIKED_MEMBERS_FROM_COMMENT = 'GET_LIKED_MEMBERS_FROM_COMMENT';
export const REPORT_COMMENT = 'REPORT_COMMENT';
export const SET_LIKED_MEMBERS_LIST = 'SET_LIKED_MEMBERS_LIST';
export const EMPTY_EVENT_COMMENT = 'EMPTY_EVENT_COMMENT';
export const SET_COMMENT_COUNT = 'SET_COMMENT_COUNT';
export const SET_EVENT_DATA = 'SET_EVENT_DATA';
export const SET_COMMENT_LASTID = 'SET_COMMENT_LASTID';
export const SHARE_EVENT = 'SHARE_EVENT';

//History
export const GET_HISTORY_DATA = 'GET_HISTORY_DATA';
export const GET_ACTION_LIST_SUCCESS = 'GET_ACTION_LIST_SUCCESS';
export const DELETE_HISTORY_DATA = 'DELETE_HISTORY_DATA';
export const DELETE_All_HISTORY = 'DELETE_All_HISTORY';
//Notifications
export const ADD_NOTIFICATION_REQUEST = 'ADD_NOTIFICATION_REQUEST';
export const GET_NOTIFICATIONS_REQUEST = 'GET_NOTIFICATIONS_REQUEST';
export const GET_NOTIFICATIONS_SUCCESS = 'GET_NOTIFICATIONS_SUCCESS';
export const DELETE_NOTIFICATION_REQUEST = 'DELETE_NOTIFICATION_REQUEST';
export const SET_NOTIFICATION_AS_READ = 'SET_NOTIFICATION_AS_READ';
export const DELETE_ALL_NOTIFICATIONS = 'DELETE_ALL_NOTIFICATIONS';
export const DELETE_NOTIFICATION_SUCCESS = 'DELETE_NOTIFICATION_SUCCESS';
// theme
export const DARK_THEME = 'DARK_THEME';
export const LIGTH_THEME = 'LIGTH_THEME';
// Chat
export const NEW_MESSAGE = 'NEW_MESSAGE';
export const SET_CHAT_LIST = 'SET_CHAT_LIST';
export const SET_USER_DATA = 'SET_USER_DATA';
export const GET_MESSAGE_LIST = 'GET_MESSAGE_LIST';
export const CONTENT_MESSAGE = 'CONTENT_MESSAGE';
export const SET_CONTENT_MESSAGE = 'SET_CONTENT_MESSAGE';
export const GET_CHAT_BY_USER_ID = 'GET_CHAT_BY_USER_ID';
export const GET_PRIVACY_FILES = 'GET_PRIVACY_FILES';
export const GET_TERMS_FILES = 'GET_TERMS_FILES';
export const SET_PRIVACY_FILES = 'SET_PRIVACY_FILES';
export const SET_TERMS_FILE = 'SET_TERMS_FILE';
export const SEARCH_USER = 'SEARCH_USER';
export const SET_GET_MESSAGE = 'SET_GET_MESSAGE';
export const CREATE_NEW_CHAT = 'CREATE_NEW_CHAT';
export const DELETE_MESSAGE_LIST = 'DELETE_MESSAGE_LIST';
export const LOADER_VISIBLE = 'LOADER_VISIBLE';
export const SET_ACTIVE_CHAT_ID = 'SET_ACTIVE_CHAT_ID';
export const ACTIVE_CHAT_USER_ID = 'ACTIVE_CHAT_USER_ID';

//Privacy Policy
export const SET_COMMENTS = 'SET_COMMENTS';
export const GET_PRIVACY_REQUEST = 'GET_PRIVACY_REQUEST';
export const SET_UPDATE_REQUEST = 'SET_UPDATE_REQUEST';
export const SET_UPDATE_LIST = 'SET_UPDATE_LIST';
export const UPDATE_PRIVACY = 'UPDATE_PRIVACY';

//Security
export const GET_DEVICEINFO_LIST = 'GET_DEVICEINFO_LIST';
export const DELETE_DEVICEINFO_LIST = 'DELETE_DEVICEINFO_LIST';

// Push Notification
export const SET_PUSH_NOTIFICATION_SETTINGS = 'SET_PUSH_NOTIFICATION_SETTINGS';
export const REPORT_SUPPORT = 'REPORT_SUPPORT';