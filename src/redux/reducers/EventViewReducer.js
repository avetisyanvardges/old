import {SET_EVENT_VIEW_LOADER_VISIBLE} from '../../actionsTypes';

const INITIAL_STATE = {
  eventScreenLoader: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_EVENT_VIEW_LOADER_VISIBLE:
      return {
        ...state,
        eventScreenLoader: action.payload,
      };

    default:
      return state;
  }
};
