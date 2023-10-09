import {GET_ACTION_LIST_SUCCESS} from '../../actionsTypes';

const INITIAL_STATE = {
  historyData: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ACTION_LIST_SUCCESS:
      return {
        ...state,
        historyData: action.payload,
      };
    default:
      return state;
  }
};
