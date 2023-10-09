import {LOADER_VISIBLE} from '../../actionsTypes';

const INITIAL_STATE = {
  LoaderVisible: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADER_VISIBLE:
      return {
        ...state,
        LoaderVisible: action.payload,
      };
    default:
      return state;
  }
};
