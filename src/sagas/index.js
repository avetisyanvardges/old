import {takeLatest, takeEvery, all} from 'redux-saga/effects';
import {
  CREATE_NEW_EVENT,
  GET_EVENTS_LIST_DATA,
  REGISTER,
  FORGOT_PASSWORD,
  CHANGE_PASSWORD_NEW_PASSWORD,
  LOGIN,
  RESET_PASSWORD,
  LOGOUT,
  EDIT_PROFILE,
  HIDE_TOAST,
  GET_EVENT_BY_ID,
  JOIN_EVENT_REQUEST,
  DELETE_EVENT_REQUEST,
  UPDATE_EVENT_REQUEST,
  SEND_REPORT_REASON,
  GET_HISTORY_DATA,
  DELETE_HISTORY_DATA,
  DELETE_All_HISTORY,
  CHANGE_SETTINGS_REQUEST,
  ADD_NOTIFICATION_REQUEST,
  UPDATE_USER_LOCATION,
  GET_NOTIFICATIONS_REQUEST,
  GET_USER_INFORMATION,
  BLOCK_USER,
  DELETE_ALL_NOTIFICATIONS,
  SET_NOTIFICATION_AS_READ,
  DELETE_NOTIFICATION_REQUEST,
  SOCIAL_LOGIN,
  RATE_USER_REQUEST,
  GET_TYPES_REQUEST,
  GET_USER_LOCATION,
  VERIFICATION_REQUEST,
  GET_BLOCKED_USERS,
  UNBLOCK_USER,
  HIDE_TOAST_NOTIFICATION,
  SEARCH_QUERY_EVENT_LIST,
  GET_USER_BY_ID,
  CONNECT_SOCKET,
  NEW_MESSAGE,
  READ_MESSAGE,
  WRITE_MESSAGE,
  CONTENT_MESSAGE,
  GET_MESSAGE_LIST,
  DISCONECTED_SOCKET,
  GET_CHAT_BY_USER_ID,
  SEARCH_USER,
  CREATE_NEW_CHAT,
  DELETE_MESSAGE_LIST,
  GET_MEMBERS_LIST_BY_ID,
  OUT_OF_EVENT,
  GET_ALL_JOIN_REQUESTS,
  ACCEPT_EVENT,
  SEND_REQUEST_EVENT,
  REJECT_EVENT,
  CANCEL_SEND_REQUEST,
  SAVE_EVENT,
  GET_PRIVACY_FILES,
  GET_TERMS_FILES,
  GET_TOTAL_COUNT,
  DELETE_ACCOUNT,
  CHANGE_EMAIL_SECOND_CODE,
  CHANGE_EMAIL,
  SET_UPDATE_REQUEST,
  GET_PRIVACY_REQUEST,
  SET_PUSH_NOTIFICATION_SETTINGS,
  REPORT_SUPPORT,
  GET_DEVICEINFO_LIST,
  DELETE_DEVICEINFO_LIST,
  CANCEL_EVENT,
  _UPLOAD_FILE,
  GET_FIREBASE_TOKEN,
  GET_COMMENT_FROM_EVENT,
  SEND_EVENT_COMMENT,
  DELETE_EVENT_COMMENT,
  EDIT_EVENT_COMMENT,
  ADD_LIKE_FROM_COMMENT,
  GET_LIKED_MEMBERS_FROM_COMMENT,
  REPORT_COMMENT,
  GET_APP_VERSION,
  SHARE_EVENT,
} from '../actionsTypes';
import {
  getEventsListData,
  getEventById,
  joinEvent,
  leftEvent,
  deleteEvent,
  updateEvent,
  createNewEvent,
  getType,
  searchQueryEventList,
  getMembersListById,
  acceptEvent,
  sendRequestEvent,
  outOfEvent,
  getAllJoinRequests,
  rejectEvent,
  cancelSendRequest,
  saveEvent,
  cancelEvent,
  SendEventComment,
  EditEventComment,
  DeleteCommentFromEvent,
  GetCommentFromEvent,
  AddLikeFromEvent,
  GetLikedMembersFromComment,
  ReportComment,
  EventShare,
} from './rootSagas/actionsWithEvents';
import {
  login,
  logout,
  register,
  socialLogin,
  getPrivacyFiles,
  getTermsFile,
  getTokenOnLogin,
} from './rootSagas/serviceActions';
import {
  forgotPassword,
  changePasswordNewPassword,
  resetPassword,
} from './rootSagas/actionsWithPassword';
import {hideToast, hideToastNotification} from './rootSagas/hideToast';
import {
  getActionsList,
  deleteHistory,
  deleteAllHistory,
} from './rootSagas/actionsWithHistory';
import {
  saveNotification,
  getNotifications,
  setNotificationAsRead,
  deleteAllNotifications,
  deleteNotification,
} from './rootSagas/notification';
import {
  getUserData,
  blockUser,
  sendReport,
  updateUserData,
  updateProfileImage,
  changeSettings,
  rateForUser,
  updateLocation,
  getUserLocation,
  sendVerificationRequest,
  getBlockedUsers,
  unBlockUser,
  getUserById,
  getTotalCount,
  deleteAccount,
  changeEmailSendCode,
  changeEmail,
} from './rootSagas/actionWithUsers';
import {
  newMessage,
  getMessageList,
  contentMessage,
  getChatByUserId,
  searchUser,
  createChat,
  deleteMessageList,
} from './rootSagas/actionsChat';
import {
  getPrivacyPolicyList,
  setPrivacyPolicyList,
} from './rootSagas/PrivacyPolicy';
import {deleteDeviceInfoList, getDeviceInfoList} from './rootSagas/security';
import {
  reportSupport,
  setPushNotificationSettings,
} from './rootSagas/pushNotification';
import {getAppVersion} from './rootSagas/appVersion';
function* actionWatcher() {
  yield takeLatest(CREATE_NEW_EVENT, createNewEvent);
  yield takeLatest(GET_EVENTS_LIST_DATA, getEventsListData);
  yield takeLatest(SEARCH_QUERY_EVENT_LIST, searchQueryEventList);
  yield takeLatest(GET_EVENT_BY_ID, getEventById);
  yield takeLatest(JOIN_EVENT_REQUEST, joinEvent);
  yield takeLatest(UPDATE_EVENT_REQUEST, updateEvent);
  yield takeLatest(SEND_REPORT_REASON, sendReport);
  yield takeLatest(DELETE_EVENT_REQUEST, deleteEvent);
  yield takeLatest(REGISTER, register);
  yield takeLatest(FORGOT_PASSWORD, forgotPassword);
  yield takeLatest(CHANGE_PASSWORD_NEW_PASSWORD, changePasswordNewPassword);
  yield takeLatest(LOGIN, login);
  yield takeLatest(LOGOUT, logout);
  yield takeLatest(RESET_PASSWORD, resetPassword);
  yield takeLatest(EDIT_PROFILE, updateUserData);
  yield takeLatest(HIDE_TOAST, hideToast);
  yield takeLatest(HIDE_TOAST_NOTIFICATION, hideToastNotification);
  yield takeLatest(GET_HISTORY_DATA, getActionsList);
  yield takeLatest(DELETE_HISTORY_DATA, deleteHistory);
  yield takeLatest(DELETE_All_HISTORY, deleteAllHistory);
  yield takeLatest(SOCIAL_LOGIN, socialLogin);
  yield takeLatest(CHANGE_SETTINGS_REQUEST, changeSettings);
  yield takeLatest(ADD_NOTIFICATION_REQUEST, saveNotification);
  yield takeLatest(BLOCK_USER, blockUser);
  yield takeLatest(GET_BLOCKED_USERS, getBlockedUsers);
  yield takeLatest(UNBLOCK_USER, unBlockUser);
  yield takeLatest(GET_NOTIFICATIONS_REQUEST, getNotifications);
  yield takeLatest(GET_USER_INFORMATION, getUserData);
  yield takeLatest(DELETE_NOTIFICATION_REQUEST, deleteNotification);
  yield takeLatest(SET_NOTIFICATION_AS_READ, setNotificationAsRead);
  yield takeLatest(DELETE_ALL_NOTIFICATIONS, deleteAllNotifications);
  yield takeLatest(RATE_USER_REQUEST, rateForUser);
  yield takeLatest(UPDATE_USER_LOCATION, updateLocation);
  yield takeLatest(GET_TYPES_REQUEST, getType);
  yield takeLatest(GET_USER_LOCATION, getUserLocation);
  yield takeLatest(VERIFICATION_REQUEST, sendVerificationRequest);
  yield takeLatest(GET_USER_BY_ID, getUserById);
  yield takeEvery(NEW_MESSAGE, newMessage);
  yield takeLatest(GET_MESSAGE_LIST, getMessageList);
  yield takeLatest(CONTENT_MESSAGE, contentMessage);
  yield takeLatest(GET_CHAT_BY_USER_ID, getChatByUserId);
  yield takeLatest(SEARCH_USER, searchUser);
  yield takeLatest(CREATE_NEW_CHAT, createChat);
  yield takeLatest(DELETE_MESSAGE_LIST, deleteMessageList);
  yield takeLatest(GET_MEMBERS_LIST_BY_ID, getMembersListById);
  yield takeLatest(ACCEPT_EVENT, acceptEvent);
  yield takeLatest(SEND_REQUEST_EVENT, sendRequestEvent);
  yield takeLatest(OUT_OF_EVENT, outOfEvent);
  yield takeLatest(GET_ALL_JOIN_REQUESTS, getAllJoinRequests);
  yield takeLatest(REJECT_EVENT, rejectEvent);
  yield takeLatest(CANCEL_EVENT, cancelEvent);
  yield takeLatest(CANCEL_SEND_REQUEST, cancelSendRequest);
  yield takeLatest(SAVE_EVENT, saveEvent);
  yield takeLatest(GET_PRIVACY_FILES, getPrivacyFiles);
  yield takeLatest(GET_TERMS_FILES, getTermsFile);
  yield takeLatest(GET_TOTAL_COUNT, getTotalCount);
  yield takeLatest(DELETE_ACCOUNT, deleteAccount);
  yield takeLatest(CHANGE_EMAIL_SECOND_CODE, changeEmailSendCode);
  yield takeLatest(CHANGE_EMAIL, changeEmail);
  yield takeLatest(GET_PRIVACY_REQUEST, getPrivacyPolicyList);
  yield takeLatest(SET_UPDATE_REQUEST, setPrivacyPolicyList);
  yield takeLatest(SET_PUSH_NOTIFICATION_SETTINGS, setPushNotificationSettings);
  yield takeLatest(REPORT_SUPPORT, reportSupport);
  yield takeLatest(GET_DEVICEINFO_LIST, getDeviceInfoList);
  yield takeLatest(DELETE_DEVICEINFO_LIST, deleteDeviceInfoList);
  yield takeLatest(GET_FIREBASE_TOKEN, getTokenOnLogin);
  yield takeLatest(SEND_EVENT_COMMENT, SendEventComment);
  yield takeLatest(EDIT_EVENT_COMMENT, EditEventComment);
  yield takeLatest(GET_COMMENT_FROM_EVENT, GetCommentFromEvent);
  yield takeLatest(DELETE_EVENT_COMMENT, DeleteCommentFromEvent);
  yield takeLatest(ADD_LIKE_FROM_COMMENT, AddLikeFromEvent);
  yield takeLatest(GET_LIKED_MEMBERS_FROM_COMMENT, GetLikedMembersFromComment);
  yield takeLatest(REPORT_COMMENT, ReportComment);
  yield takeLatest(GET_APP_VERSION, getAppVersion);
  yield takeLatest(SHARE_EVENT, EventShare);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
