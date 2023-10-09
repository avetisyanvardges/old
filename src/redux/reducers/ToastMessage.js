import {SET_TOAST_MASSAGE} from '../../actionsTypes';

const INITIAL_STATE = {
  type: '',
  text: '',
  visible: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_TOAST_MASSAGE:
      return {
        ...state,
        type: action.payload.type,
        text: action.payload.text,
        visible: action.payload.visible,
      };
    default:
      return state;
  }
};
