import {
  SET_CHAT_LIST,
  SET_CONTENT_MESSAGE,
  SET_USER_DATA,
  SET_GET_MESSAGE,
  SET_ACTIVE_CHAT_ID,
  ACTIVE_CHAT_USER_ID,
} from '../../actionsTypes';

const INITIAL_STATE = {
  chatList: [],
  chatContent: [],
  getMessage: {},
  activeChatId: null,
  activeChatUserId: null,
  userData: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CHAT_LIST:
      return {
        ...state,
        chatList: action.payload,
      };
    case SET_CONTENT_MESSAGE:
      return {
        ...state,
        chatContent: action.payload,
      };
    case SET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case SET_GET_MESSAGE:
      if (action.payload.socketType === 'message') {
        const {from, chatId, message, socketType} = action.payload;
        return {
          ...state,
          getMessage: {
            chatId: chatId,
            userId: from?._id,
            notificationImage: from?.picture?.length
              ? {uri: from?.picture[0]?.url}
              : require('../../assets/images/profilePic.png'),
            notificationName: from?.name ? from?.name : from?.nickname,
            notificationMessage: message,
            notificationType: socketType,
          },
        };
      }
      if (action.payload.socketType === 'comment') {
        const {user, comment, socketType, eventId, _id} = action.payload;
        return {
          ...state,
          getMessage: {
            notificationImage: user?.picture?.length
              ? {uri: user?.picture[0]?.url}
              : require('../../assets/images/profilePic.png'),
            notificationName: user?.name ? user?.name : user?.nickname,
            notificationMessage: comment,
            notificationType: socketType,
            eventId,
            commentId: _id,
          },
        };
      }
    case SET_ACTIVE_CHAT_ID:
      return {
        ...state,
        activeChatId: action.payload,
      };

    case ACTIVE_CHAT_USER_ID:
      return {
        ...state,
        activeChatUserId: action.payload,
      };
    default:
      return state;
  }
};
