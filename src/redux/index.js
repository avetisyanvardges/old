import {combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {createStore, applyMiddleware} from 'redux';
import rootSaga from '../sagas';
import NetInfoReducer from './reducers/NetInfoReducer';
import RegisterScreenReducer from './reducers/RegisterScreenReducer';
import LoginScreenReducer from './reducers/LoginScreenReducer';
import AddEventsScreenReducer from './reducers/AddEventsScreenReducer';
import ProfileDataReducer from './reducers/ProfileDataReducer';
import ChangePasswordScreenReducer from './reducers/ChangePasswordScreenReducer';
import ResetPasswordScreenReducer from './reducers/ResetPasswordScreenReducer';
import ToastMessage from './reducers/ToastMessage';
import ToastNotification from './reducers/ToastNotification';
import GetEventListReduser from './reducers/GetEventListReduser';
import EventViewReducer from './reducers/EventViewReducer';
import GetActionsListReducer from './reducers/GetActionsListReducer';
import filtersDataReducer from './reducers/FiltersDataReducer';
import ThemeReducer from './reducers/ThemeReducer';
import ChatReducer from './reducers/ChatReducer';
import Loader from './reducers/Loader.js';
import PrivacyPolicy from './reducers/PrivacyPolicy';
import EventComment from './reducers/EventComment';
import AppInfo from './reducers/AppInfo';

let reducers = combineReducers({
  netInfo: NetInfoReducer,
  registerScreenData: RegisterScreenReducer,
  loginScreenData: LoginScreenReducer,
  changePasswordScreenData: ChangePasswordScreenReducer,
  resetPasswordScreenData: ResetPasswordScreenReducer,
  profileData: ProfileDataReducer,
  addEventsScreenData: AddEventsScreenReducer,
  toastMessageState: ToastMessage,
  toastNotificationState: ToastNotification,
  eventList: GetEventListReduser,
  eventScreenLoader: EventViewReducer,
  filtersData: filtersDataReducer,
  history: GetActionsListReducer,
  themes: ThemeReducer,
  Chat: ChatReducer,
  loader: Loader,
  privacy: PrivacyPolicy,
  eventComment: EventComment,
  appInfo: AppInfo,
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
