import {put, select} from 'redux-saga/effects';
import {apiUrl} from '../../assets/constants';
import {
  GET_EVENTS_LIST_DATA_SUCCESS,
  GET_EVENT_BY_ID_SUCCESS,
  HIDE_TOAST,
  SET_TOAST_MASSAGE,
  GET_TYPES_SUCCESS,
  SET_EVENT_VIEW_LOADER_VISIBLE,
  SET_ADD_EVENTS_SCREEN_LOADER_VISIBLE,
  LOADER_VISIBLE,
  SET_EVENT_LOADER,
  SET_MEMBER_LIST_LOADER,
  SET_EVENT_COMMENT,
  PUSH_EVENT_COMMENT,
  FILTER_EVENT_COMMENT,
  SET_LIKE_FROM_COMMENT,
  SET_LIKED_MEMBERS_LIST,
  SET_COMMENT_COUNT,
  SET_EVENT_DATA,
  SET_COMMENT_LASTID,
  SET_REPLY_COMMENT,
  FILTER_REPLY_COMMENT,
} from '../../actionsTypes';
import i18n from '../../assets/i18next';
import NavigationService from '../../NavigationService';
import HttpClient from '../../services/HttpClient';

function* createNewEvent(data) {
  try {
    const {formData, callBack} = data.payload;
    const response = yield HttpClient.post(
      `${apiUrl}/event/createAndUpload`,
      formData,
    );
    if (response?.status === 200) {
      yield put({
        type: SET_TOAST_MASSAGE,
        payload: {
          visible: true,
          type: 'success',
          text: i18n.t('alerts.eventSuccessfullyCreated'),
        },
      });
      yield put({type: HIDE_TOAST});
      yield NavigationService.navigate('EventsList');
      yield callBack();
    }
    yield put({type: SET_ADD_EVENTS_SCREEN_LOADER_VISIBLE, payload: false});
  } catch (e) {
    yield put({type: SET_ADD_EVENTS_SCREEN_LOADER_VISIBLE, payload: false});
    console.log(e.toString(), 'createNewEvent');
  }
}

function* getEventsListData(data) {
  const {
    callback,
    offset,
    page,
    loadMore,
    disableLoadMore,
    filtersData,
    lang,
    lat,
    zoom,
  } = data.payload;

  try {
    yield put({type: LOADER_VISIBLE, payload: true});
    let url = `${apiUrl}/event?${lang ? 'lang=' + lang : ''}${
      lat ? '&lat=' + lat : ''
    }${zoom ? '&zoom=' + zoom : ''}${offset ? '&limit=' + offset : ''}${
      page ? '&page=' + page : ''
    }${
      filtersData?.searchType ? '&searchType=' + filtersData?.searchType : ''
    }${
      filtersData?.searchQuery ? '&searchQuery=' + filtersData?.searchQuery : ''
    }${filtersData?.location ? '&location=' + filtersData?.location : ''}${
      filtersData?.type ? '&type=' + filtersData?.type : ''
    }${filtersData?.startDate ? '&startDate=' + filtersData?.startDate : ''}${
      filtersData?.endDate ? '&endDate=' + filtersData?.endDate : ''
    }&${filtersData?.my_events ? '&my_events=true' : ''}`;
    const response = yield HttpClient.get(url, {params: filtersData?.params});
    yield put({type: LOADER_VISIBLE, payload: false});
    if (loadMore) {
      if (
        !response?.data?.eventList?.length ||
        response?.data?.eventList?.length < 10
      ) {
        yield disableLoadMore();
      } else {
        let eventList = yield select((store) => store.eventList?.eventList);
        let newArr = eventList.concat(response.data.eventList);
        yield put({type: GET_EVENTS_LIST_DATA_SUCCESS, payload: newArr});
      }
    } else {
      yield put({
        type: GET_EVENTS_LIST_DATA_SUCCESS,
        payload: response.data.eventList,
      });
    }
    if (callback) {
      yield callback(response);
    }
    yield put({type: LOADER_VISIBLE, payload: false});
  } catch (e) {
    yield put({type: LOADER_VISIBLE, payload: false});
    console.log(e.toString(), 'getEventsListData');
  }
}

function* searchQueryEventList(data) {
  try {
    const {searchQuery} = data.payload;
    const response = yield HttpClient.get(
      `${apiUrl}/event/?searchQuery=${searchQuery}`,
    );
    yield put({type: LOADER_VISIBLE, payload: false});
    yield put({
      type: GET_EVENTS_LIST_DATA_SUCCESS,
      payload: response?.data?.eventList,
    });
  } catch (e) {
    yield put({type: LOADER_VISIBLE, payload: false});
    console.log(e.toString(), 'searchQueryEventList');
  }
}
function* getEventById(data) {
  try {
    const {id} = data.payload;
    const response = yield HttpClient.get(`${apiUrl}/event/${id}`);
    if (!response.data.eventData) {
      yield put({
        type: SET_TOAST_MASSAGE,
        payload: {
          visible: true,
          type: 'error',
          text: i18n.t('alerts.eventDeleted'),
        },
      });
      yield put({type: SET_EVENT_VIEW_LOADER_VISIBLE, payload: false});
      NavigationService.back();
    } else if (response.status === 200 && response.data.eventData) {
      console.log(response, 777);
      const event = response?.data?.eventData;
      if (data.payload?.callBack) {
        data.payload?.callBack(response);
      }
      yield put({type: SET_EVENT_VIEW_LOADER_VISIBLE, payload: false});
      yield put({type: GET_EVENT_BY_ID_SUCCESS, payload: event});
    }
    yield put({type: SET_EVENT_LOADER, payload: false});
    yield put({type: HIDE_TOAST});
  } catch (e) {
    yield NavigationService.back();
    yield put({type: SET_EVENT_VIEW_LOADER_VISIBLE, payload: false});
    console.log(e.response, 'getEventByID');
  }
}

function* joinEvent(data) {
  try {
    const {event_id, joined_user} = data.payload;
    const response = yield HttpClient.post(`${apiUrl}/event/join`, {
      event_id,
      joined_user,
    });
    yield put({
      type: SET_TOAST_MASSAGE,
      payload: {visible: true, type: 'success', text: response.data.message},
    });
    yield put({type: HIDE_TOAST});
    yield put({
      type: GET_EVENT_BY_ID_SUCCESS,
      payload: response.data.eventData,
    });
  } catch (e) {
    console.log(e.toString(), 'joinEvent');
  }
}

function* deleteEvent(data) {
  try {
    const {eventId} = data.payload;
    const response = yield HttpClient.delete(`${apiUrl}/event/${eventId}`);
    yield put({
      type: LOADER_VISIBLE,
      payload: false,
    });
    yield put({
      type: SET_TOAST_MASSAGE,
      payload: {visible: true, type: 'success', text: response.data.message},
    });
    yield put({type: HIDE_TOAST});
    NavigationService.navigate('EventsList');
  } catch (e) {
    yield put({
      type: SET_EVENT_LOADER,
      payload: false,
    });
    console.log(e.toString(), 'deleteEvent');
  }
}

function* updateEvent(data) {
  try {
    const {formData, id, callBack} = data.payload;
    console.log(formData, 'formData');
    const response = yield HttpClient.put(
      `${apiUrl}/event/updateAndUpload/${id}`,
      formData,
    );
    console.log(response, 'res');
    yield put({type: SET_ADD_EVENTS_SCREEN_LOADER_VISIBLE, payload: false});
    yield put({
      type: SET_TOAST_MASSAGE,
      payload: {visible: true, type: 'success', text: response.data.message},
    });
    yield put({type: HIDE_TOAST});
    yield NavigationService.back();
    yield callBack();
  } catch (e) {
    yield put({type: SET_ADD_EVENTS_SCREEN_LOADER_VISIBLE, payload: false});
    console.log(e.response, 'updateEvent');
  }
}

function* getType() {
  try {
    const response = yield HttpClient.get(`${apiUrl}/type`);
    console.log(response, 'RESPONSE');
    yield put({type: GET_TYPES_SUCCESS, payload: response.data.types});
    yield put({type: SET_EVENT_VIEW_LOADER_VISIBLE, payload: false});
  } catch (e) {
    yield put({type: SET_EVENT_VIEW_LOADER_VISIBLE, payload: false});
    console.log(e.toString(), 'getTypes');
  }
}

function* getMembersListById(data) {
  const {callBack, error, eventId} = data.payload;
  try {
    const response = yield HttpClient.get(
      `${apiUrl}/event/${eventId}/getMemberList?limit=500`,
    );
    if (response.status === 200) {
      yield callBack(response);
      yield put({type: SET_MEMBER_LIST_LOADER, payload: false});
    }
  } catch (e) {
    yield error(e);
    yield put({type: SET_MEMBER_LIST_LOADER, payload: false});
    console.log(e.toString(), 'getMembersListById');
  }
}

function* getAllJoinRequests(data) {
  const {callBack, error, eventId} = data.payload;
  try {
    const response = yield HttpClient.get(
      `${apiUrl}/request/${eventId}?limit=500`,
    );
    console.log(response, 88);
    yield callBack(response);
    yield put({type: SET_MEMBER_LIST_LOADER, payload: false});
  } catch (e) {
    error(e);
    yield put({type: SET_MEMBER_LIST_LOADER, payload: false});
    console.log(e.toString(), 'getAllJoinRequests');
  }
}

function* acceptEvent(data) {
  const {callBack, error, id} = data.payload;
  try {
    const response = yield HttpClient.post(`${apiUrl}/request/approve`, {id});
    if (response.status === 200) {
      callBack(response);
    }
  } catch (e) {
    yield error(e);
    console.log(e.toString(), 'acceptEvent');
  }
}

function* rejectEvent(data) {
  const {callBack, error, id, type} = data.payload;
  try {
    const response = yield HttpClient.post(`${apiUrl}/request/reject`, {
      id,
      type,
    });
    if (response.status === 200) {
      yield callBack(response);
    }
  } catch (e) {
    yield error(e);
    console.log(e.toString(), 'rejectEvent');
  }
}

function* cancelEvent(data) {
  const {callBack, error, id} = data.payload;
  try {
    const response = yield HttpClient.post(`${apiUrl}/request/cancel`, {id});
    if (response.status === 200) {
      yield callBack(response);
    }
  } catch (e) {
    yield error(e);
    console.log(e.toString(), 'cancelEvent');
  }
}

function* leftEvent(data) {
  const {callBack, error, eventId} = data.payload;
  try {
    const response = yield HttpClient.post(`${apiUrl}/event/leftEvent`, {
      eventId,
    });
    if (response.status === 200) {
      yield callBack(response);
    }
  } catch (e) {
    yield error(e);
    console.log(e.toString(), 'leftEvent');
  }
}

function* sendRequestEvent(data) {
  const {callBack, error, userId, eventId} = data.payload;
  try {
    const response = yield HttpClient.post(`${apiUrl}/request`, {
      userId,
      eventId,
    });
    if (response.status === 200) {
      yield callBack(response);
    }
  } catch (e) {
    yield error(e);
    console.log(e.toString(), 'sendRequestEvent');
  }
}

function* outOfEvent(data) {
  const {callBack, error, eventId} = data.payload;
  try {
    const response = yield HttpClient.get(`${apiUrl}/event/${eventId}`);
    if (response.status === 200) {
      yield callBack(response);
    }
  } catch (e) {
    yield error(e);
    console.log(e.toString(), 'outOfEvent');
  }
}

function* saveEvent(data) {
  const {callBack, error, eventId} = data.payload;
  try {
    const response = yield HttpClient.post(`${apiUrl}/event/saveEvent`, {
      eventId,
    });
    if (response.status === 200) {
      yield callBack(response);
    }
  } catch (e) {
    yield error(e);
    console.log(e.toString(), 'saveEvent');
  }
}

function* cancelSendRequest(data) {
  const {callBack, error, requestId} = data.payload;
  try {
    const response = yield HttpClient.post(`${apiUrl}/request/cancel`, {
      id: requestId,
    });
    if (response.status === 200) {
      yield callBack(response);
    }
  } catch (e) {
    yield error(e);
    console.log(e.toString(), 'cancelSendRequest');
  }
}

function* SendEventComment(data) {
  const {eventId, comment, mentionIds, repliedId} = data.payload;
  console.log(data.payload, 'DATA PAYLOAD');
  try {
    const response = yield HttpClient.post(`${apiUrl}/comment`, {
      eventId,
      comment,
      repliedId,
      mentionIds,
    });
    if (response.data.newComment.repliedId) {
      yield put({
        type: SET_REPLY_COMMENT,
        payload: response?.data?.newComment,
      });
    } else {
      yield put({
        type: PUSH_EVENT_COMMENT,
        payload: response?.data?.newComment,
      });
    }
    yield put({type: SET_EVENT_VIEW_LOADER_VISIBLE, payload: false});
  } catch (e) {
    console.log(e, 'cancelSendEventComment');
  }
}

function* EditEventComment(data) {
  try {
    const {id, comment, userId} = data.payload;
    const response = yield HttpClient.put(
      `${apiUrl}/comment/${id}`,
      comment,
      userId,
    );
    if (response.status === 200) {
      console.log(response, 'EDIT COMMENT RESPONSE');
    }
  } catch (e) {
    console.log(e.toString(), 'Edit Event ERROR');
  }
}

export const initialLastId = (state) => state.eventComment.lastId;

function* GetCommentFromEvent(data) {
  try {
    const {id, count, callBack} = data.payload;
    let lastIdState = yield select(initialLastId);
    const response = yield HttpClient.get(
      `${apiUrl}/comment/${id}?lastId=${lastIdState}${
        count === 0 ? '' : `&&count=${count}`
      }`,
    );
    console.log(response, 'RESpOo');
    if (response.status === 200) {
      yield put({
        type: SET_EVENT_COMMENT,
        payload: response?.data.comments,
        count,
      });
      yield put({
        type: SET_COMMENT_COUNT,
        payload: response?.data?.dataCount,
      });
      yield put({
        type: SET_EVENT_DATA,
        payload: response?.data?.eventData,
      });
      yield put({
        type: SET_COMMENT_LASTID,
        payload:
          response?.data?.comments[response?.data?.comments.length - 1]?._id,
      });
      yield callBack(response);
      yield put({
        type: SET_EVENT_LOADER,
        payload: false,
      });
    }
  } catch (e) {
    console.log(e.response, 'GET Event COMMENT ERROR');
  }
}

function* DeleteCommentFromEvent(data) {
  try {
    const {id, repliedId} = data.payload;
    const response = yield HttpClient.delete(`${apiUrl}/comment/${id}`);
    if (repliedId) {
      yield put({
        type: FILTER_REPLY_COMMENT,
        payload: {repliedId: repliedId, id: id},
      });
    } else {
      yield put({
        type: FILTER_EVENT_COMMENT,
        payload: id,
      });
    }
  } catch (e) {
    console.log(e.response, 'DELETE EVENT COMMENT ERROR');
  }
}

function* EventShare(data) {
  try {
    const {id, formData, callBack} = data.payload;
    const response = yield HttpClient.post(
      `${apiUrl}/event/share/${id}`,
      formData,
    );
    if (response.status === 200) {
      console.log(response, 77777777777);
      yield callBack(response);
    }
  } catch (e) {
    console.log(e.response, 'SHARE EVENT');
  }
}

function* AddLikeFromEvent(data) {
  try {
    const {id} = data.payload;
    const response = yield HttpClient.post(`${apiUrl}/comment/like/${id}`);
    yield put({
      type: SET_LIKE_FROM_COMMENT,
      payload: {likes: response?.data?.likes, _id: id},
    });
  } catch (e) {
    console.log(e.toString(), 'LIKE COMMENT ERROR');
  }
}

function* GetLikedMembersFromComment(data) {
  try {
    const {id, limitCount, page} = data.payload;
    const response = yield HttpClient.get(`${apiUrl}/comment/likedUsers/${id}`);
    if (response.status === 200) {
      yield put({
        type: SET_LIKED_MEMBERS_LIST,
        payload: response?.data?.likedUsers,
      });
    }
  } catch (e) {
    console.log(e.response, 'LIKED MEMBERS ERROR');
  }
}

function* ReportComment(data) {
  try {
    const {content, commentId, repliedId} = data.payload;
    const response = yield HttpClient.post(`${apiUrl}/comment/report`, {
      content,
      commentId,
    });
    if (repliedId) {
      console.log(repliedId, commentId, 333);
      yield put({
        type: FILTER_REPLY_COMMENT,
        payload: {repliedId: repliedId, id: commentId},
      });
    } else {
      yield put({
        type: FILTER_EVENT_COMMENT,
        payload: commentId,
      });
    }
  } catch (e) {
    console.log(e.response, 'report ERROR');
  }
}

export {
  cancelEvent,
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
  SendEventComment,
  EditEventComment,
  GetCommentFromEvent,
  DeleteCommentFromEvent,
  AddLikeFromEvent,
  GetLikedMembersFromComment,
  ReportComment,
  EventShare,
};
