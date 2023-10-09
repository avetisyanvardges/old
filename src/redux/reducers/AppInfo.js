import {SET_APP_STATE} from '../../actionsTypes';

const INITIAL_STATE = {
  updated: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_APP_STATE:
      return {
        ...state,
        updated: action.payload,
      };

    default:
      return state;
  }
};
