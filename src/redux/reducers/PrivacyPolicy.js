import AsyncStorage from '@react-native-community/async-storage';
import {
  SET_COMMENTS,
  SET_UPDATE_LIST,
  UPDATE_PRIVACY,
} from '../../actionsTypes';

const INITIAL_STATE = {
  newList: {
    closedAccount: {},
    comments: {},
    inviteYouEvents: {},
    sendYouMessages: {},
    mentioned: {},
    networkStatus: {},
    findContacts: {},
  },
  list: {
    closedAccount: {},
    comments: {},
    inviteYouEvents: {},
    sendYouMessages: {},
    mentioned: {},
    networkStatus: {},
    findContacts: {},
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_COMMENTS:
      for (let key in action.payload) {
        if (key === 'userId' || key === '_id' || key === '__v') {
        } else {
          action.payload[key] = {
            title: `privacy.${key}.title`,
            linkState: `${action.payload[key]}`,
            page: key,
          };
        }
      }
      AsyncStorage.setItem('@privacy', JSON.stringify(action.payload));

      return {
        ...state,
        list: action.payload,
      };
    case UPDATE_PRIVACY:
      AsyncStorage.setItem('@privacy', JSON.stringify(action.payload));

      return {
        ...state,
        list: action.payload,
      };
    case SET_UPDATE_LIST:
      for (let key in action.payload) {
        if (key === 'userId' || key === '_id' || key === '__v') {
        } else {
          action.payload[key] = action.payload[key].linkState;
        }
      }
      AsyncStorage.setItem('@list', JSON.stringify(action.payload));
      return {
        ...state,
        newList: INITIAL_STATE.list,
      };
    default:
      return state;
  }
};
