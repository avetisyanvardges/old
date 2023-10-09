import {put} from 'redux-saga/effects';
import {apiUrl} from '../../assets/constants';
import {
  SET_TOAST_MASSAGE,
  HIDE_TOAST,
  LOADER_VISIBLE,
} from '../../actionsTypes';
import HttpClient from '../../services/HttpClient';

function* setPushNotificationSettings(data) {
  try {
    const {body, callBack} = data.payload;
    let response = yield HttpClient.post(`${apiUrl}/settings`, body);
    yield callBack(response);
  } catch (e) {
    console.log(e.toString(), 'sendNotification');
  }
}

function* reportSupport(data) {
  try {
    const {body, callBack} = data.payload;
    let response = yield HttpClient.post(
      `${apiUrl}/report/programProblem`,
      body,
    );
    yield put({
      type: SET_TOAST_MASSAGE,
      payload: {visible: true, type: 'success', text: response.data.message},
    });
    yield put({type: HIDE_TOAST});
    yield put({type: LOADER_VISIBLE, payload: false});
    yield callBack(response);
  } catch (e) {
    yield put({type: LOADER_VISIBLE, payload: false});
    console.log(e.toString(), 'reportSupport');
  }
}

export {setPushNotificationSettings, reportSupport};
