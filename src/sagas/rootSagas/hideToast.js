import {SET_TOAST_MASSAGE, SET_TOAST_NOTIFICATION} from '../../actionsTypes';
import {put, delay} from 'redux-saga/effects';

function* hideToast() {
  yield delay(3000);
  yield put({
    type: SET_TOAST_MASSAGE,
    payload: {visible: false, type: '', text: ''},
  });
}
function* hideToastNotification() {
  yield delay(7000);
  yield put({
    type: SET_TOAST_NOTIFICATION,
    payload: {visible: false, notification: null},
  });
}

export {hideToast, hideToastNotification};
