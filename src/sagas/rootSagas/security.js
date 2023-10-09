import AsyncStorage from '@react-native-community/async-storage';
import {apiUrl} from '../../assets/constants';
import HttpClient from '../../services/HttpClient';

function* getDeviceInfoList(data) {
  const {callBack, error} = data.payload;
  try {
    let response = yield HttpClient.get(`${apiUrl}/settings/loginHistory`);
    callBack(response);
  } catch (e) {
    error(e);
    console.log(e.toString(), 'getDeviceInfoList');
  }
}

function* deleteDeviceInfoList() {
  try {
    let deviceToken = yield AsyncStorage.getItem('deviceToken');
    yield HttpClient.delete(`${apiUrl}/device/${deviceToken}`);
  } catch (e) {
    console.log(e.toString(), 'getDeviceInfoList');
  }
}

export {getDeviceInfoList, deleteDeviceInfoList};
