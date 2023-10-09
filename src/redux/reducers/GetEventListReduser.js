import {
  GET_EVENTS_LIST_DATA_SUCCESS,
  GET_EVENT_BY_ID_SUCCESS,
  DELETE_EVENT_REQUEST_SUCCESS,
  GET_TYPES_SUCCESS,
  SET_MAP_EVENTS,
  SET_EVENT_LOADER,
  SELECTED_EVENT,
  SET_MEMBER_LIST_LOADER,
} from '../../actionsTypes';

const INITIAL_STATE = {
  eventList: [],
  event: {},
  eventTypes: [],
  members: [],
  mapEvents: [],
  selectedEvent: null,
  eventLoader: false,
  memberListLoader: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_EVENTS_LIST_DATA_SUCCESS: {
      let mutatuinPayload = [
        ...action.payload.map((element) => {
          element.location.lang = element.location.lang
            ? element.location.lang
            : element?.location?.coordinates?.length &&
              element?.location?.coordinates[0]
            ? element?.location?.coordinates[0]
            : 0;
          element.location.lat = element.location.lat
            ? element.location.lat
            : element?.location?.coordinates?.length &&
              element?.location?.coordinates[1]
            ? element?.location?.coordinates[1]
            : 0;
          if (element.location.coordinates) {
            delete element.location.coordinates;
          }
          return element;
        }),
      ];
      return {
        ...state,
        eventList: [...mutatuinPayload],
      };
    }
    case GET_EVENT_BY_ID_SUCCESS: {
      action.payload.location.lang = action.payload?.location?.lang
        ? action.payload?.location?.lang
        : action.payload?.location?.coordinates?.length &&
          action.payload?.location?.coordinates[0]
        ? action.payload?.location?.coordinates[0]
        : 0;
      action.payload.location.lat = action.payload?.location?.lat
        ? action.payload?.location?.lat
        : action.payload?.location?.coordinates?.length &&
          action.payload?.location?.coordinates[1]
        ? action.payload?.location?.coordinates[1]
        : 0;
      if (action.payload.location.coordinates) {
        delete action.payload.location.coordinates;
      }
      const members = action.payload.joined;
      return {
        ...state,
        event: action.payload,
        members,
      };
    }
    case SET_MAP_EVENTS: {
      let mutatuinPayload = [
        ...action.payload.map((element) => {
          element.location.lang = element.location.lang
            ? element.location.lang
            : element?.location?.coordinates?.length &&
              element?.location?.coordinates[0]
            ? element?.location?.coordinates[0]
            : 0;
          element.location.lat = element.location.lat
            ? element.location.lat
            : element?.location?.coordinates?.length &&
              element?.location?.coordinates[1]
            ? element?.location?.coordinates[1]
            : 0;
          if (element.location.coordinates) {
            delete element.location.coordinates;
          }
          return element;
        }),
      ];
      return {
        ...state,
        mapEvents: [...mutatuinPayload],
      };
    }
    case DELETE_EVENT_REQUEST_SUCCESS: {
      const eventId = action.payload;
      const eventList = state.eventList.filter((event) => {
        return event._id !== eventId;
      });
      return {
        eventList,
      };
    }
    case GET_TYPES_SUCCESS: {
      const eventTypes = action.payload;
      return {
        ...state,
        eventTypes: eventTypes,
      };
    }

    case SELECTED_EVENT:
      return {
        ...state,
        selectedEvent: action.payload,
      };
    case SET_EVENT_LOADER:
      return {
        ...state,
        eventLoader: action.payload,
      };
    case SET_MEMBER_LIST_LOADER:
      return {
        ...state,
        memberListLoader: action.payload,
      };
    default:
      return state;
  }
};
