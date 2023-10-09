import {SET_TOAST_NOTIFICATION} from '../../actionsTypes';

const INITIAL_STATE = {
  notification: null,
  visible: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_TOAST_NOTIFICATION:
      return {
        ...state,
        notification: action.payload.notification,
        visible: action.payload.visible,
      };
    default:
      return state;
  }
};
