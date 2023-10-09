import {apiUrl} from '../../assets/constants';
import {put} from 'redux-saga/effects';
import {
  HIDE_TOAST,
  LOADER_VISIBLE,
  SET_CHANGE_PASSWORD_SCREEN_LOADER_VISIBLE,
  SET_TOAST_MASSAGE,
} from '../../actionsTypes';
import NavigationService from '../../NavigationService';
import i18n from '../../assets/i18next';
import HttpClient from '../../services/HttpClient';

function* forgotPassword(data) {
  try {
    const {email} = data.payload;
    const response = yield HttpClient.post(`${apiUrl}/user/passwordRecovery`, {
      email: email,
    });
    if (response.status === 200) {
      NavigationService.navigate('ResetPassword');
    }
    yield put({type: LOADER_VISIBLE, payload: false});
  } catch (e) {
    yield put({type: LOADER_VISIBLE, payload: false});
    console.log(e.toString(), 'forgotPassword');
  }
}

function* changePasswordNewPassword(data) {
  try {
    const {password, newPassword} = data.payload;
    const response = yield HttpClient.post(`${apiUrl}/user/changePassword`, {
      password,
      newPassword,
    });
    if (response.status === 200) {
      NavigationService.navigate('Menu');
      yield put({
        type: SET_TOAST_MASSAGE,
        payload: {
          visible: true,
          type: 'success',
          text: i18n.t('alerts.passwordSuccessfullyChanged'),
        },
      });
      yield put({type: HIDE_TOAST});
    }
    yield put({
      type: SET_CHANGE_PASSWORD_SCREEN_LOADER_VISIBLE,
      payload: false,
    });
  } catch (e) {
    console.log(e.toString(), 'changePasswordNewPassword');
  }
}

function* resetPassword(data) {
  try {
    const {verificationCode, password} = data.payload;
    const response = yield HttpClient.post(`${apiUrl}/user/resetPassword`, {
      password: password,
      code: verificationCode,
    });
    if (response.status === 200) {
      yield put({
        type: SET_TOAST_MASSAGE,
        payload: {
          visible: true,
          type: 'success',
          text: i18n.t('alerts.passwordSuccessfullyReset'),
        },
      });
      yield put({type: HIDE_TOAST});
      NavigationService.navigate('Login');
    }
    yield put({type: LOADER_VISIBLE, payload: false});
  } catch (e) {
    yield put({type: LOADER_VISIBLE, payload: false});
    console.log(e.toString(), 'resetPassword');
  }
}
export {resetPassword, changePasswordNewPassword, forgotPassword};
