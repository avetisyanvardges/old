import AsyncStorage from '@react-native-community/async-storage';
import {put} from 'redux-saga/effects';
import {LOADER_VISIBLE} from '../../actionsTypes';
import {apiUrl} from '../../assets/constants';
import HttpClient from '../../services/HttpClient';

function* getPrivacyPolicyList(data) {
  const {callBack, error} = data.payload;
  try {
    let response = yield HttpClient.get(`${apiUrl}/privacyPolicy/list`);
    yield AsyncStorage.setItem('@privacy', JSON.stringify(response.data.list));
    yield put({type: LOADER_VISIBLE, payload: false});
    yield callBack(response);
  } catch (e) {
    yield error(e);
    console.log(e.toString(), 'getPrivacyPolicyList');
  }
}
function* setPrivacyPolicyList(data) {
  const {list, callBack, error} = data.payload;
  try {
    let response = yield HttpClient.post(`${apiUrl}/privacyPolicy/list`, {
      list,
    });
    yield callBack(response);
  } catch (e) {
    yield error(e);
    yield put({type: LOADER_VISIBLE, payload: false});
    console.log(e.toString(), 'getPrivacyPolicyList');
  }
}

export {getPrivacyPolicyList, setPrivacyPolicyList};
