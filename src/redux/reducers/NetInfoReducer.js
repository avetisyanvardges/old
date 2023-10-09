import {SET_IS_ONLINE} from '../../actionsTypes';

const INITIAL_STATE = {
  isOnline: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_IS_ONLINE:
      return {
        ...state,
        isOnline: action.payload,
      };
    default:
      return state;
  }
};
