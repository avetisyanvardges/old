import {
  SET_FILTERS,
  SET_NEAREST,
  SET_ACTIVE,
  SET_TODAY,
  SET_THIS_WEEK,
  SET_THIS_MONTH,
  SET_POPULAR,
} from '../../actionsTypes';

const INITIAL_STATE = {
  filters: {
    searchQuery: '',
    searchType: '',
    page: 1,
  },
  nearest: false,
  active: false,
  today: false,
  this_week: false,
  this_month: false,
  popular: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_FILTERS:
      return {
        ...state,
        filters: action.payload.filters,
      };
    case SET_NEAREST:
      return {
        ...state,
        nearest: action.payload,
      };
    case SET_ACTIVE:
      return {
        ...state,
        active: action.payload,
      };
    case SET_TODAY:
      return {
        ...state,
        today: action.payload,
      };
    case SET_THIS_WEEK:
      return {
        ...state,
        this_week: action.payload,
      };
    case SET_THIS_MONTH:
      return {
        ...state,
        this_month: action.payload,
      };
    case SET_POPULAR:
      return {
        ...state,
        popular: action.payload,
      };
    default:
      return state;
  }
};
