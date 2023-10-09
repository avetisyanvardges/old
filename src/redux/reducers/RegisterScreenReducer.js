import {
  SET_PRIVACY_FILES,
  SET_REGISTER_SCREEN_LOADER_VISIBLE,
  SET_TERMS_FILE,
} from '../../actionsTypes';

const INITIAL_STATE = {
  screenLoaderVisible: true,
  privacyFile: '',
  terms: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_REGISTER_SCREEN_LOADER_VISIBLE:
      return {
        ...state,
        screenLoaderVisible: action.payload,
      };
    case SET_PRIVACY_FILES:
      return {
        ...state,
        privacyFile: action.payload,
      };
    case SET_TERMS_FILE:
      return {
        ...state,
        terms: action.payload,
      };
    default:
      return state;
  }
};
