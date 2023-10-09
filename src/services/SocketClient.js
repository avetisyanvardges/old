import {io} from 'socket.io-client';
import AsyncStorage from '@react-native-community/async-storage';
import {
  ACTIVE_CHAT_USER_ID,
  GET_MESSAGE_LIST,
  PUSH_EVENT_COMMENT,
  SET_ACTIVE_CHAT_ID,
  SET_CONTENT_MESSAGE,
  SET_GET_MESSAGE,
  SET_REPLY_COMMENT,
} from '../actionsTypes';
import store from '../redux';
import NavigationService from '../NavigationService';
import {apiSocketUrl} from '../assets/constants';

class _SocketClient {
  inAppNotification = null;
  setupInAppNotification = (inAppNotification) => {
    this.inAppNotification = inAppNotification;
  };
  setup = async () => {
    this.token = await AsyncStorage.getItem('token');
    this.socket = io(apiSocketUrl + `?token=${this.token}`, {jsonp: false});
    this.socket.on('messages.get', async (msg) => {
      const route = NavigationService?.navigationRef()?.state?.nav?.routes;
      try {
        if (msg.socketType === 'comment') {
          if (msg?.eventId === store.getState().eventComment.eventData._id) {
            if (msg.repliedId) {
              store.dispatch({
                type: SET_REPLY_COMMENT,
                payload: msg,
              });
            } else {
              store.dispatch({
                type: PUSH_EVENT_COMMENT,
                payload: msg,
              });
            }
          } else {
            store.dispatch({type: SET_GET_MESSAGE, payload: msg});
            if (this.inAppNotification) {
              await this.inAppNotification.show();
            }
          }
        } else {
          if (route[route.length - 1].routeName === 'ChatListScreen') {
            store.dispatch({type: GET_MESSAGE_LIST});
          }
          if (msg.chatId === store.getState().Chat.activeChatId) {
            store.dispatch({
              type: SET_CONTENT_MESSAGE,
              payload: [msg, ...store.getState().Chat.chatContent],
            });
          } else {
            store.dispatch({type: SET_GET_MESSAGE, payload: msg});
            if (this.inAppNotification) {
              this.inAppNotification.show();
            }
          }
        }
      } catch (e) {
        console.log(e.toString(), '_SocketClient');
      }
    });

    this.socket?.on('disconnected', async () => {
      await this.setup();
    });
  };
  disconnectedSocket = async () => {
    await this.socket?.emit('disconnected');
  };
  commentRoom = async (id) => {
    await this.socket?.emit('connect.room', id);
  };
}

const SocketClient = new _SocketClient();

export default SocketClient;
