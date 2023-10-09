import {
  EMPTY_EVENT_COMMENT,
  FILTER_EVENT_COMMENT,
  PUSH_EVENT_COMMENT,
  SET_REPLY_COMMENT,
  SET_COMMENT_COUNT,
  SET_COMMENT_LASTID,
  SET_EVENT_COMMENT,
  SET_EVENT_DATA,
  SET_LIKE_FROM_COMMENT,
  SET_LIKED_MEMBERS_LIST,
  FILTER_REPLY_COMMENT,
} from '../../actionsTypes';

const INITIAL_STATE = {
  comments: [],
  eventData: {},
  commentCount: '',
  likedMembers: [],
  lastId: '',
};

// count u lastid eghav lastidiic sksac count-i chapov,
// count eghav 0ic minchev count - i chapov,
// lastId eghav 0ic sksac minchev lastId u masivy shrjac e ksksvi nor commentneric

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_EVENT_COMMENT:
      return {
        ...state,
        comments:
          action.count === 0
            ? [...action.payload]
            : [...state.comments, ...action.payload],
      };
    case SET_COMMENT_COUNT:
      return {
        ...state,
        commentCount: action.payload,
      };
    case SET_EVENT_DATA:
      return {
        ...state,
        eventData: action.payload || state.eventData,
      };
    case SET_COMMENT_LASTID:
      console.log(action.payload, 'action.payload');
      return {
        ...state,
        lastId: action.payload,
      };
    case PUSH_EVENT_COMMENT:
      return {
        ...state,
        comments: [action.payload, ...state.comments],
      };
    case SET_REPLY_COMMENT:
      const arr = state.comments.map((object) => {
        if (object._id === action.payload.repliedId) {
          return {
            ...object,
            repliedUsers: object.repliedUsers
              ? [action.payload, ...object.repliedUsers]
              : [action.payload],
            repliedCount: object.repliedCount ? object.repliedCount + 1 : 1,
          };
        } else {
          return object;
        }
      });
      return {
        ...state,
        comments: [...arr],
      };
    case EMPTY_EVENT_COMMENT:
      return {
        ...state,
        comments: [],
        lastId: '',
        eventData: '',
      };
    case FILTER_EVENT_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment._id !== action.payload,
        ),
      };
    case FILTER_REPLY_COMMENT:
      const newArr = state.comments.map((object) => {
        console.log(object, 'Object');
        if (object?._id === action.payload.repliedId) {
          return {
            ...object,
            repliedUsers: object.repliedUsers.filter(
              (comment) => comment._id !== action.payload.id,
            ),
            repliedCount: object.repliedCount > 1 ? object.repliedCount - 1 : 0,
          };
        } else {
          return object;
        }
      });
      return {
        ...state,
        comments: [...newArr],
      };
    case SET_LIKE_FROM_COMMENT:
      const array = state.comments.map((object) => {
        if (object?._id === action.payload?._id) {
          return {
            ...object,
            likes: action.payload?.likes,
          };
        } else {
          return object;
        }
      });
      return {
        ...state,
        comments: [...array],
      };
    case SET_LIKED_MEMBERS_LIST:
      return {
        ...state,
        likedMembers: action.payload,
      };
    default:
      return state;
  }
};
