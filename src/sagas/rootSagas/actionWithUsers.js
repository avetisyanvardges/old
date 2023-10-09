import axios from 'axios';
import {put} from 'redux-saga/effects';
import {apiUrl} from '../../assets/constants';
import {
  SET_PROFILE_DATA,
  SET_TOAST_MASSAGE,
  HIDE_TOAST,
  GET_SETTINGS_SUCCESS,
  GET_TYPES_REQUEST,
  SET_EVENT_VIEW_LOADER_VISIBLE,
  SET_UPDATE_DELETE_PROFILE_SCREEN_LOADER,
  SET_USER_LOCATION,
  SET_BLOCKED_USERS,
  GET_USER_INFORMATION,
  GET_USER_BY_ID,
  LOGOUT,
  LOADER_VISIBLE,
  SET_ALLOWED_GEO_LOCATION,
  SET_USER_LOADING,
} from '../../actionsTypes';
import i18n from '../../assets/i18next';
import AsyncStorage from '@react-native-community/async-storage';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Geolocation from '@react-native-community/geolocation';
import HttpClient from '../../services/HttpClient';
import NavigationService from '../../NavigationService';
import {request, PERMISSIONS} from 'react-native-permissions';
import {Platform} from 'react-native';

function* getUserData(data) {
  try {
    yield put({type: SET_USER_LOADING, payload: true});
    const id = yield AsyncStorage.getItem('id');
    let response = yield HttpClient.get(`${apiUrl}/user/${id}`);
    if (response.status === 200) {
      yield put({
        type: SET_PROFILE_DATA,
        payload: response.data.user.user_data,
      });
      yield put({
        type: GET_SETTINGS_SUCCESS,
        payload: {language: response?.data?.user?.user_data?.language},
      });
      yield AsyncStorage.setItem(
        'language',
        response?.data?.user?.user_data?.language,
      );
      yield i18n.changeLanguage(
        response?.data?.user?.user_data?.language || 'en',
      );
      if (data?.payload?.callBack) {
        yield data?.payload?.callBack(response);
      }
      yield put({type: SET_USER_LOADING, payload: false});
    }
  } catch (e) {
    yield put({type: SET_USER_LOADING, payload: false});
    console.log(e.toString(), 'getUserData');
  }
}

function* getUserById(data) {
  try {
    const {id, callBack, queryType} = data.payload;
    const response = yield HttpClient.get(
      `${apiUrl}/user/${id}?query=${queryType}&page=1&limit=500`,
    );
    if (response?.status === 200) {
      yield callBack(response);
    }
  } catch (e) {
    console.log(e.toString(), 'getUserById');
    NavigationService.back();
  }
}

function* getTotalCount(data) {
  const {id, callBack, error} = data.payload;
  try {
    let response = yield HttpClient.get(`${apiUrl}/user/getTotalCount/${id}`);
    if (response.status === 200) {
      yield callBack(response);
    }
  } catch (e) {
    yield error(e.response);
    console.log(e.toString(), 'getTotalCount');
  }
}

function* updateUserData(data) {
  try {
    const {formData} = data.payload;
    const id = yield AsyncStorage.getItem('id');
    let profile = yield HttpClient.patch(`${apiUrl}/user/${id}`, formData);
    if (profile.status === 200) {
      yield put({
        type: SET_TOAST_MASSAGE,
        payload: {visible: true, type: 'success', text: profile.data.message},
      });
      yield put({type: HIDE_TOAST});
      yield put({type: GET_USER_INFORMATION, payload: ''});
      const userData = {id: id, queryType: '', callBack: () => {}};
      yield put({type: GET_USER_BY_ID, payload: userData});
      yield put({
        type: SET_UPDATE_DELETE_PROFILE_SCREEN_LOADER,
        payload: false,
      });
      yield NavigationService.back();
    }
  } catch (e) {
    yield put({type: SET_UPDATE_DELETE_PROFILE_SCREEN_LOADER, payload: false});
    console.log(e.toString(), 'updateUserData');
  }
}

function* changeSettings(data) {
  try {
    const {language, notification} = data.payload;
    let body;
    if (language) {
      body = {language: language};
    } else {
      body = {notification: notification};
    }
    yield HttpClient.post(`${apiUrl}/settings`, body);
    yield put({type: GET_TYPES_REQUEST, payload: {}});
    yield put({type: GET_SETTINGS_SUCCESS, payload: {language}});
  } catch (e) {
    console.log(e.toString(), 'changeSettings');
  }
}

function* rateForUser(data) {
  try {
    const {userId, rating} = data.payload;
    yield HttpClient.post(`${apiUrl}/user/rate`, {userId, rating});
    yield put({type: SET_EVENT_VIEW_LOADER_VISIBLE, payload: false});
  } catch (e) {
    yield put({type: SET_EVENT_VIEW_LOADER_VISIBLE, payload: false});
    console.log(e.toString(), 'rateForUser');
  }
}

function* updateLocation(data) {
  try {
    const {location} = data.payload;
    yield HttpClient.post(`${apiUrl}/user/location`, {location});
  } catch (e) {
    console.log(e.toString(), 'updateUserData');
  }
}

function* getUserLocation(data) {
  try {
    if (Platform.OS === 'android') {
      var location = {};
      var allowedGeolocation = null;
      try {
        const dataLocation = yield RNAndroidLocationEnabler.promptForEnableLocationIfNeeded(
          {interval: 100000, fastInterval: 100000},
        );
        yield new Promise((resolve, reject) => {
          if (
            dataLocation === 'enabled' ||
            dataLocation === 'already-enabled'
          ) {
            Geolocation.getCurrentPosition(
              (position) => {
                allowedGeolocation = true;
                location = {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  longitudeDelta: 0.001,
                  latitudeDelta: 0.001,
                };
                resolve(location);
              },
              (error) => reject(error),
              {
                enableHighAccuracy: false,
                timeout: 2000,
                maximumAge: 3600000,
              },
            );
          }
        });
      } catch (e) {
        const {data} = yield axios.get('https://ipapi.co/json/');
        allowedGeolocation = false;
        location = {
          latitude: data.latitude,
          longitude: data.longitude,
          longitudeDelta: 0.001,
          latitudeDelta: 0.001,
        };
      }
      yield put({type: SET_USER_LOCATION, payload: location});
      yield put({type: SET_ALLOWED_GEO_LOCATION, payload: allowedGeolocation});
      if (data.payload?.callBack) {
        data?.payload?.callBack(location);
      }
    } else {
      var location = {};
      var allowedGeolocation = null;
      try {
        yield new Promise((resolve, reject) => {
          request(PERMISSIONS.IOS.LOCATION_ALWAYS)
            .then(() => {
              Geolocation.getCurrentPosition(
                (position) => {
                  allowedGeolocation = true;
                  location = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    longitudeDelta: 0.001,
                    latitudeDelta: 0.001,
                  };
                  resolve(location);
                },
                (error) => reject(error),
              );
            })
            .catch((error) => {
              reject(error);
            });
        });
      } catch (e) {
        const {data} = yield axios.get('https://ipapi.co/json/');
        allowedGeolocation = false;
        location = {
          latitude: data.latitude,
          longitude: data.longitude,
          longitudeDelta: 0.001,
          latitudeDelta: 0.001,
        };
      }
      yield put({type: SET_USER_LOCATION, payload: location});
      yield put({type: SET_ALLOWED_GEO_LOCATION, payload: allowedGeolocation});
      if (data.payload?.callBack) {
        data?.payload?.callBack(location);
      }
    }
  } catch (e) {
    console.log(e.toString(), 'getUserLocation');
  }
}

function* sendVerificationRequest(data) {
  try {
    const {formData} = data.payload;
    const response = yield HttpClient.post(
      `${apiUrl}/user/sendVerificationRequestAndUpload`,
      formData,
    );
    yield put({
      type: SET_TOAST_MASSAGE,
      payload: {visible: true, type: 'success', text: response.data.message},
    });
    yield put({type: HIDE_TOAST});
  } catch (e) {
    console.log(e.toString(), 'sendVerificationRequest');
  }
}
function* getBlockedUsers() {
  try {
    const response = yield HttpClient.get(
      `${apiUrl}/privacyPolicy/blockedUserList`,
    );
    if (response.status === 200) {
      yield put({type: SET_BLOCKED_USERS, payload: response.data.list});
    }
  } catch (e) {
    console.log(e.toString(), 'getBlockedUsers');
  }
}

function* blockUser(data) {
  const {blockedId, callBack, error} = data.payload;
  try {
    const response = yield HttpClient.post(
      `${apiUrl}/privacyPolicy/blockUser/`,
      {blockedId},
    );
    yield put({
      type: SET_TOAST_MASSAGE,
      payload: {visible: true, type: 'success', text: response.data.message},
    });
    yield put({type: HIDE_TOAST});
    yield callBack(response);
  } catch (e) {
    yield error(e);
    console.log(e.toString(), 'blockUser');
  }
}

function* unBlockUser(data) {
  const {blockedId, callBack, error} = data.payload;
  try {
    const response = yield HttpClient.post(
      `${apiUrl}/privacyPolicy/unlockUser/`,
      {blockedId},
    );
    yield put({
      type: SET_TOAST_MASSAGE,
      payload: {visible: true, type: 'success', text: response.data.message},
    });
    yield put({type: HIDE_TOAST});
    yield callBack(response);
  } catch (e) {
    yield error(e);
    console.log(e.toString(), 'unBlockUser');
  }
}

function* sendReport(data) {
  const {content, userId, eventId} = data.payload;
  try {
    const response = yield HttpClient.post(`${apiUrl}/event/report`, {
      content: content,
      userId: userId,
      eventId: eventId,
    });
    yield put({
      type: SET_TOAST_MASSAGE,
      payload: {visible: true, type: 'success', text: response.data.message},
    });
    yield put({type: HIDE_TOAST});
  } catch (e) {
    console.log(e.response, 'sendReport');
  }
}

function* deleteAccount(data) {
  try {
    const {userId} = data.payload;
    const response = yield HttpClient.delete(`${apiUrl}/user/${userId}`);
    if (response.status === 200) {
      yield put({
        type: SET_TOAST_MASSAGE,
        payload: {visible: true, type: 'success', text: response.data.message},
      });
      yield put({type: LOGOUT, payload: {}});
      yield put({type: HIDE_TOAST});
    }
  } catch (e) {
    console.log(e.toString(), 'deleteAccount');
  }
}

function* changeEmailSendCode(data) {
  try {
    const {email, callBack} = data.payload;
    const response = yield HttpClient.post(
      `${apiUrl}/user/changeEmailSendCode`,
      {email},
    );
    if (response?.status === 200) {
      yield callBack(response);
      yield put({
        type: SET_TOAST_MASSAGE,
        payload: {visible: true, type: 'success', text: response.data.message},
      });
      yield put({type: HIDE_TOAST});
    }
    yield put({type: LOADER_VISIBLE, payload: false});
  } catch (e) {
    yield put({type: LOADER_VISIBLE, payload: false});
    console.log(e.toString(), 'changeEmailSendCode');
  }
}

function* changeEmail(data) {
  try {
    const {email, code, callBack} = data.payload;
    const response = yield HttpClient.post(`${apiUrl}/user/changeEmail`, {
      email,
      code,
    });
    if (response.status === 200) {
      yield callBack(response);
      yield put({
        type: SET_TOAST_MASSAGE,
        payload: {
          visible: true,
          type: 'success',
          text: response?.data?.message,
        },
      });
    }
    yield put({type: LOADER_VISIBLE, payload: false});
    yield put({type: HIDE_TOAST});
  } catch (e) {
    yield put({type: LOADER_VISIBLE, payload: false});
    console.log(e.toString(), 'changeEmail');
  }
}

export {
  getUserData,
  updateUserData,
  changeSettings,
  blockUser,
  unBlockUser,
  getBlockedUsers,
  rateForUser,
  updateLocation,
  getUserLocation,
  sendVerificationRequest,
  sendReport,
  getUserById,
  getTotalCount,
  deleteAccount,
  changeEmailSendCode,
  changeEmail,
};
