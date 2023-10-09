import {SET_CHANGE_PASSWORD_SCREEN_LOADER_VISIBLE} from '../../actionsTypes';

const INITIAL_STATE = {
  screenLoader: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CHANGE_PASSWORD_SCREEN_LOADER_VISIBLE:
      return {
        ...state,
        screenLoader: action.payload,
      };
    default:
      return state;
  }
};
