import Sentry from '@sentry/react-native';
import { takeLeading, call, put } from 'redux-saga/effects';
import {
  getUserFailure,
  getUserRequest,
  getUserSuccess,
  postUserFailure,
  postUserRequest,
  postUserSuccess,
} from '../reducers/user';
import { RESTful, RETURN_CODE, handleAlert } from '../utils';
import { setAccessToken, deleteAccessToken } from '../utils/auth';

function* workGetUser(action) {
  try {
    const { return_code: returnCode, return_message: returnMessage, return_data: returnData } = yield call(
      RESTful,
      'GET',
      '/user',
      action.payload,
    );
    if (returnCode === RETURN_CODE.SUCCESS) {
      const { accessToken } = returnData;
      yield setAccessToken(accessToken);
      yield put(getUserSuccess(returnData));
    } else {
      yield put(getUserFailure());
      yield handleAlert(
        '로그인 실패',
        returnCode === RETURN_CODE.INVALID_TOKEN ? '로그인이 만료되었습니다. 다시 로그인해주세요,' : returnMessage,
        deleteAccessToken,
      );
    }
  } catch (e) {
    yield Sentry.captureException(e);
    console.error('%c%s', 'background: #00ff00; color: #ffffff', '[GET] (/user)', '\n', e);
    yield put(getUserFailure());
  }
}

function* workPostUser(action) {
  try {
    const {
      return_code: returnCode,
      return_message: returnMessage,
      return_data: { accessToken, ...rest },
    } = yield call(RESTful, 'POST', '/user', action.payload);
    if (returnCode === RETURN_CODE.SUCCESS) {
      yield setAccessToken(accessToken);
      yield put(postUserSuccess({ ...rest }));
    } else {
      yield put(postUserFailure());
      yield handleAlert('회원가입 실패', returnMessage, deleteAccessToken);
    }
  } catch (e) {
    yield Sentry.captureException(e);
    console.error('%c%s', 'background: #00ff00; color: #ffffff', '[POST] (/user)', '\n', e);
    yield put(postUserFailure());
  }
}

function* watchGetUser() {
  yield takeLeading(getUserRequest, workGetUser);
}

function* watchPostUser() {
  yield takeLeading(postUserRequest, workPostUser);
}
export default [watchGetUser, watchPostUser];
