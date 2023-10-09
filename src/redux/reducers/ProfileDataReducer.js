import {
  GET_SETTINGS_SUCCESS,
  SET_PROFILE_DATA,
  SET_BLOCKED_USERS,
  SET_UPDATE_DELETE_PROFILE_SCREEN_LOADER,
  GET_NOTIFICATIONS_SUCCESS,
  DELETE_NOTIFICATION_SUCCESS,
  SET_USER_LOCATION,
  SET_ALLOWED_GEO_LOCATION,
  SET_USER_LOADING,
} from '../../actionsTypes';

const INITIAL_STATE = {
  screenLoaderVisible: false,
  profile: {},
  settings: [],
  notifications: [],
  location: {},
  count: 0,
  blockedUsers: {},
  allowedGeolocation: false,
  userLoading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER_LOADING:
      return {
        ...state,
        userLoading: action.payload,
      };
    case SET_UPDATE_DELETE_PROFILE_SCREEN_LOADER:
      return {
        ...state,
        screenLoaderVisible: action.payload,
      };
    case SET_PROFILE_DATA:
      return {
        ...state,
        profile: action.payload,
      };
    case GET_SETTINGS_SUCCESS:
      return {
        ...state,
        settings: action.payload,
      };
    case GET_NOTIFICATIONS_SUCCESS:
      let count = 0;
      action.payload.map((note) => {
        if (note.status === 'unread') {
          count++;
        }
      });
      return {
        ...state,
        notifications: action.payload,
        count,
      };
    case DELETE_NOTIFICATION_SUCCESS: {
      const notification = state.notifications.filter((note) => {
        return note.id !== action.payload;
      });
      return {
        ...state,
        notifications: notification,
      };
    }
    case SET_USER_LOCATION: {
      return {
        ...state,
        location: action.payload,
      };
    }
    case SET_BLOCKED_USERS: {
      return {
        ...state,
        blockedUsers: action.payload,
      };
    }
    case SET_ALLOWED_GEO_LOCATION: {
      return {
        ...state,
        allowedGeolocation: action.payload,
      };
    }
    default:
      return state;
  }
};
