import {SET_LOGIN_SCREEN_LOADER_VISIBLE} from '../../actionsTypes';

const INITIAL_STATE = {
  screenLoaderVisible: true,
  email: '',
  password: '',
  checkedRememberMe: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LOGIN_SCREEN_LOADER_VISIBLE:
      return {
        ...state,
        screenLoaderVisible: action.payload,
      };
    default:
      return state;
  }
};
