import {put, select} from 'redux-saga/effects';
import {apiUrl} from '../../assets/constants';
import {
  GET_NOTIFICATIONS_SUCCESS,
  DELETE_NOTIFICATION_SUCCESS,
} from '../../actionsTypes';
import HttpClient from '../../services/HttpClient';

function* saveNotification(data) {
  try {
    const {status, messageId} = data.payload;
    const notifications = yield select(
      (store) => store.profileData.notifications,
    );
    let response = yield HttpClient.post(`${apiUrl}/notification`, {
      messageId,
      status,
    });
    if (response.status === 200) {
      notifications.forEach((item, _) => {
        if (item?._id === messageId) {
          item.status = 'read';
        }
      });
      yield put({type: GET_NOTIFICATIONS_SUCCESS, payload: notifications});
    }
  } catch (e) {
    console.log(e.toString(), 'saveNotification');
  }
}
function* getNotifications() {
  try {
    const response = yield HttpClient.get(`${apiUrl}/notification/`);
    yield put({
      type: GET_NOTIFICATIONS_SUCCESS,
      payload: response.data.notifications,
    });
  } catch (e) {
    console.log(e.toString(), 'getNotifications');
  }
}
function* deleteNotification(data) {
  try {
    const {noteId} = data.payload;
    yield HttpClient.delete(`${apiUrl}/notification/${noteId}`);
    yield put({type: DELETE_NOTIFICATION_SUCCESS, payload: noteId});
    if (data?.payload?.callBack) {
      data.payload.callBack();
    }
  } catch (e) {
    console.log(e.toString(), 'deleteNotifications');
  }
}

function* deleteAllNotifications() {
  try {
    const response = yield HttpClient.delete(`${apiUrl}/notification`);
    if (response.status === 200) {
      yield put({type: GET_NOTIFICATIONS_SUCCESS, payload: []});
    }
  } catch (e) {
    console.log(e.toString(), 'deleteAllNotifications');
  }
}

function* setNotificationAsRead() {
  try {
    const notifications = yield select(
      (store) => store.profileData.notifications,
    );
    const response = yield HttpClient.post(
      `${apiUrl}/notification/setAsRead`,
      {},
    );
    if (response.status === 200) {
      notifications.forEach((item) => (item.status = 'read'));
      yield put({type: GET_NOTIFICATIONS_SUCCESS, payload: notifications});
    }
  } catch (e) {
    console.log(e.toString(), 'setNotificationAsRead');
  }
}

export {
  saveNotification,
  getNotifications,
  deleteNotification,
  setNotificationAsRead,
  deleteAllNotifications,
};
