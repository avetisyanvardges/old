import {put, select} from 'redux-saga/effects';
import {
  SET_CHAT_LIST,
  SET_CONTENT_MESSAGE,
  LOADER_VISIBLE,
  GET_MESSAGE_LIST,
  SET_USER_DATA,
} from '../../actionsTypes';
import {apiUrl} from '../../assets/constants';
import HttpClient from '../../services/HttpClient';

function* getMessageList() {
  try {
    let response = yield HttpClient.get(`${apiUrl}/messages`);
    let profile = yield select((store) => store.profileData?.profile);
    let mutationData = response.data.chats.map((elem) => {
      elem.memberList = elem.memberList.find((f) => f._id !== profile._id);
      if (!elem.memberList) {
        elem.memberList = profile;
      }
      return elem;
    });
    yield put({type: SET_CHAT_LIST, payload: mutationData});
    yield put({type: LOADER_VISIBLE, payload: false});
  } catch (e) {
    yield put({type: LOADER_VISIBLE, payload: false});
    console.log(e.toString(), 'getMessageList99999');
  }
}

function* deleteMessageList(data) {
  try {
    const {callBack, chatId} = data.payload;
    const response = yield HttpClient.post(`${apiUrl}/messages/ignoreChat/`, {
      chatId,
    });
    yield callBack(response);
    yield put({type: GET_MESSAGE_LIST});
    yield put({type: LOADER_VISIBLE, payload: false});
  } catch (e) {
    yield put({type: LOADER_VISIBLE, payload: false});
    console.log(e.toString(), 'deleteMessageList');
  }
}

function* contentMessage(data) {
  try {
    const {chatId, callBack} = data.payload;
    if (chatId) {
      const response = yield HttpClient.get(
        `${apiUrl}/messages/${chatId}?limit=${1000}`,
      );
      yield put({type: SET_CONTENT_MESSAGE, payload: response.data.messages});
      yield put({type: SET_USER_DATA, payload: response.data.userData[0]});
      yield callBack(response);
    }
    yield put({type: LOADER_VISIBLE, payload: false});
  } catch (e) {
    yield put({type: LOADER_VISIBLE, payload: false});
    console.log(e.toString(), 'contentMessage');
  }
}

function* newMessage(data) {
  try {
    const {messageData, callBack} = data.payload;
    const response = yield HttpClient.post(
      `${apiUrl}/messages/create`,
      messageData,
    );
    yield callBack(response);
    yield put({type: LOADER_VISIBLE, payload: false});
  } catch (e) {
    yield put({type: LOADER_VISIBLE, payload: false});
    console.log(e.toString(), 'newMessage');
  }
}

function* createChat(data) {
  try {
    const {createdInfo, callBack} = data.payload;
    const response = yield HttpClient.post(
      `${apiUrl}/messages/createChat`,
      createdInfo,
    );
    if (response.status === 200) {
      yield callBack(response);
    }
    yield put({type: LOADER_VISIBLE, payload: false});
  } catch (e) {
    yield put({type: LOADER_VISIBLE, payload: false});
    console.log(e.toString(), 'createChat');
  }
}

function* getChatByUserId(data) {
  const {callBack, error, userId} = data.payload;
  try {
    const response = yield HttpClient.post(
      `${apiUrl}/messages/getChatByUserId`,
      {id: userId},
    );
    yield callBack(response);
    yield put({type: LOADER_VISIBLE, payload: false});
  } catch (e) {
    yield error(e);
    yield put({type: LOADER_VISIBLE, payload: false});
    console.log(e.toString(), 'getChatByUserId');
  }
}

function* searchUser(data) {
  const {callBack, error, query} = data.payload;
  try {
    const response = yield HttpClient.get(
      `${apiUrl}/user/getUserWebList?search=${query}&limit=100000`,
    );
    if (response.status === 200) {
      yield callBack(response);
    }
    yield put({type: LOADER_VISIBLE, payload: false});
  } catch (e) {
    yield error(e);
    yield put({type: LOADER_VISIBLE, payload: false});
    console.log(e.toString(), 'searchUser');
  }
}

export {
  newMessage,
  getMessageList,
  contentMessage,
  getChatByUserId,
  searchUser,
  createChat,
  deleteMessageList,
};
