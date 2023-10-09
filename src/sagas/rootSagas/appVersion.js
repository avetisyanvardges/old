import {put} from 'redux-saga/effects';
import {LOADER_VISIBLE, SET_APP_STATE} from '../../actionsTypes';
import HttpClient from '../../services/HttpClient';
import {deviceInfo} from '../../assets/deviceInfo';
import NavigationService from '../../NavigationService';
import {apiUrl} from '../../assets/constants';

function* getAppVersion() {
  try {
    let response = yield HttpClient.get(`${apiUrl}/version`);
    if (response.status === 200) {
      if (deviceInfo.appVersion < response.data.version) {
        yield put({type: SET_APP_STATE, payload: false});
        yield NavigationService.navigate('AppVersion');
      }
    }
    yield put({type: LOADER_VISIBLE, payload: false});
  } catch (e) {
    yield put({type: LOADER_VISIBLE, payload: false});
    console.log(e.toString(), 'getAppVersion');
  }
}

export {getAppVersion};
