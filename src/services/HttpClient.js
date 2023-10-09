import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import i18n from '../assets/i18next';
import store from '../redux/index';
import {HIDE_TOAST, LOGOUT, SET_TOAST_MASSAGE} from '../actionsTypes';
import {apiUrl} from '../assets/constants';

const HttpClient = axios.create({
  baseURL: apiUrl,
});

HttpClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers['x-authorization'] = token;
  }
  return config;
});

HttpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const {dispatch} = store;
    if (error.response && error.response.status === 401) {
      await dispatch({type: LOGOUT, payload: {}});
    }
    if (
      error.response &&
      error.response.data &&
      error.response.status !== 401
    ) {
      await dispatch({
        type: SET_TOAST_MASSAGE,
        payload: {
          visible: true,
          type: 'error',
          text:
            error.response.data.message ||
            i18n.t('alerts.something_went_wrong'),
        },
      });
      await dispatch({type: HIDE_TOAST, payload: {}});
    }
    return Promise.reject(error);
  },
);
export default HttpClient;
