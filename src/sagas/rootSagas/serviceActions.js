import {put} from 'redux-saga/effects';
import i18n from '../../assets/i18next';
import {apiUrl} from '../../assets/constants';
import AsyncStorage from '@react-native-community/async-storage';
import {
  SET_LOGIN_SCREEN_LOADER_VISIBLE,
  SET_TOAST_MASSAGE,
  HIDE_TOAST,
  SET_REGISTER_SCREEN_LOADER_VISIBLE,
  GET_USER_INFORMATION,
  GET_NOTIFICATIONS_SUCCESS,
  SET_PROFILE_DATA,
  GET_SETTINGS_SUCCESS,
  SET_PRIVACY_FILES,
  SET_TERMS_FILE,
  GET_NOTIFICATIONS_REQUEST,
  SET_USER_LOADING,
} from '../../actionsTypes';

import NavigationService from '../../NavigationService';
import SocketClient from '../../services/SocketClient';
import {deviceInfo} from '../../assets/deviceInfo';
import {
  getBrand,
  getDeviceName,
  getModel,
  getUniqueId,
} from 'react-native-device-info';
import HttpClient from '../../services/HttpClient';
import messaging from '@react-native-firebase/messaging';

function* register(data) {
  try {
    const {formData} = data.payload;
    yield HttpClient.post(`${apiUrl}/user/signup`, formData);
    yield put({type: SET_REGISTER_SCREEN_LOADER_VISIBLE, payload: false});
    yield put({
      type: SET_TOAST_MASSAGE,
      payload: {
        visible: true,
        type: 'success',
        text: i18n.t('alerts.successfullyRegistered'),
      },
    });
    yield put({type: HIDE_TOAST});
    NavigationService.navigate('GeneralInfo', {query: 'Login'});
  } catch (e) {
    yield put({type: SET_REGISTER_SCREEN_LOADER_VISIBLE, payload: false});
    console.log(e.toString(), 'register');
  }
}

function* login(data) {
  try {
    const {username, password} = data.payload;
    const deviceData = {
      username: username,
      password: password,
      deviceId: getUniqueId(),
      deviceName: deviceInfo.ios
        ? `${yield getDeviceName()}`
        : `${yield getBrand()} ${yield getModel()}`,
    };
    const response = yield HttpClient.post(`${apiUrl}/user/login`, deviceData);
    if (response?.status === 200) {
      yield AsyncStorage.setItem('token', response?.data?.token);
      yield AsyncStorage.setItem('id', response.data?.user?.userData?._id);
      yield put({type: GET_USER_INFORMATION, payload: ''});
      yield put({type: GET_NOTIFICATIONS_REQUEST, payload: ''});
      yield put({
        type: GET_SETTINGS_SUCCESS,
        payload: {language: response.data?.user?.language},
      });
      yield getTokenOnLogin();
      yield SocketClient.setup();
      yield NavigationService.navigate('Menu');
    }
    yield put({type: SET_LOGIN_SCREEN_LOADER_VISIBLE, payload: false});
  } catch (e) {
    yield put({type: SET_LOGIN_SCREEN_LOADER_VISIBLE, payload: false});
    console.log(e.toString(), 'login');
  }
}

function* logout() {
  try {
    yield AsyncStorage.removeItem('token');
    yield AsyncStorage.removeItem('id');
    yield SocketClient.disconnectedSocket();
    yield messaging().deleteToken();
    yield put({type: GET_NOTIFICATIONS_SUCCESS, payload: []});
    yield put({type: SET_PROFILE_DATA, payload: ''});
    yield NavigationService.navigate('Login');
    yield put({type: SET_LOGIN_SCREEN_LOADER_VISIBLE, payload: false});
    yield put({type: SET_USER_LOADING, payload: false});
  } catch (e) {
    yield put({type: SET_LOGIN_SCREEN_LOADER_VISIBLE, payload: false});
    yield put({type: SET_USER_LOADING, payload: false});
    console.log(e.toString(), 'logout');
  }
}

function* socialLogin(data) {
  try {
    const {id, email, first_name, last_name, picture, username} = data.payload;
    const deviceData = {
      id,
      email,
      first_name,
      last_name,
      picture,
      username,
      deviceId: getUniqueId(),
      deviceName: deviceInfo.ios
        ? `${yield getDeviceName()}`
        : `${yield getBrand()} ${yield getModel()}`,
    };
    const response = yield HttpClient.post(
      `${apiUrl}/user/socialLogin`,
      deviceData,
    );
    if (response?.status === 200) {
      yield AsyncStorage.setItem('token', response.data?.token);
      yield AsyncStorage.setItem('id', response.data?.user?.userData?._id);
      yield put({type: GET_USER_INFORMATION, payload: ''});
      yield getTokenOnLogin();
      yield SocketClient.setup();
      yield NavigationService.navigate('Menu');
      if (response?.data?.newUser) {
        yield NavigationService.navigate('GeneralInfo', {query: 'Menu'});
      }
    }
    yield put({type: SET_LOGIN_SCREEN_LOADER_VISIBLE, payload: false});
  } catch (e) {
    yield put({type: SET_LOGIN_SCREEN_LOADER_VISIBLE, payload: false});
    console.log(e.toString(), 'socialLogin');
  }
}
function* getTokenOnLogin() {
  try {
    let deviceToken = yield messaging().getToken();
    yield HttpClient.post(`${apiUrl}/device`, {token: deviceToken});
  } catch (e) {
    console.log(e.toString(), 'getTokenOnLogin');
  }
}

function* getPrivacyFiles() {
  try {
    const {data} = yield HttpClient.get(`${apiUrl}/privacy/`);
    yield put({type: SET_PRIVACY_FILES, payload: data});
  } catch (e) {
    console.log(e.toString(), 'getPrivacyFile');
  }
}

function* getTermsFile() {
  try {
    let response = yield HttpClient.get(`${apiUrl}/terms/`);
    yield put({type: SET_TERMS_FILE, payload: response.data});
  } catch (e) {
    console.log(e.toString(), 'getTermsFile');
  }
}

export {
  register,
  login,
  logout,
  socialLogin,
  getPrivacyFiles,
  getTermsFile,
  getTokenOnLogin,
};
