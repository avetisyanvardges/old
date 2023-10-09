import {put} from 'redux-saga/effects';
import {apiUrl} from '../../assets/constants';
import {
  HIDE_TOAST,
  SET_TOAST_MASSAGE,
  GET_ACTION_LIST_SUCCESS,
  GET_HISTORY_DATA,
  SET_EVENT_VIEW_LOADER_VISIBLE,
} from '../../actionsTypes';
import HttpClient from '../../services/HttpClient';

function* getActionsList() {
  try {
    const response = yield HttpClient.get(`${apiUrl}/history`);
    const {historyList} = response.data;
    yield put({type: GET_ACTION_LIST_SUCCESS, payload: historyList});
    yield put({type: SET_EVENT_VIEW_LOADER_VISIBLE, payload: false});
  } catch (e) {
    yield put({type: SET_EVENT_VIEW_LOADER_VISIBLE, payload: false});
    console.log(e.toString(), 'getHistoryList');
  }
}

function* deleteHistory(data) {
  try {
    const id = data.payload;
    let response = yield HttpClient.delete(`${apiUrl}/history/${id}`);
    if (response.status === 200) {
      yield put({type: GET_HISTORY_DATA, payload: ''});
      yield put({
        type: SET_TOAST_MASSAGE,
        payload: {visible: true, type: 'success', text: response.data.message},
      });
      yield put({type: HIDE_TOAST});
    }
    yield put({type: SET_EVENT_VIEW_LOADER_VISIBLE, payload: false});
  } catch (e) {
    yield put({type: SET_EVENT_VIEW_LOADER_VISIBLE, payload: false});
    console.log(e.toString(), 'deleteHistory');
  }
}

function* deleteAllHistory() {
  try {
    let response = yield HttpClient.post(`${apiUrl}/history/delete`, {});
    if (response.status === 200) {
      yield put({type: GET_HISTORY_DATA, payload: ''});
      yield put({
        type: SET_TOAST_MASSAGE,
        payload: {visible: true, type: 'success', text: response.data.message},
      });
      yield put({type: HIDE_TOAST});
    }
    yield put({type: SET_EVENT_VIEW_LOADER_VISIBLE, payload: false});
  } catch (e) {
    yield put({type: SET_EVENT_VIEW_LOADER_VISIBLE, payload: false});
    console.log(e.toString(), 'deleteAllHistory');
  }
}

export {getActionsList, deleteHistory, deleteAllHistory};
