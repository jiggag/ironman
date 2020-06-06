import {
  takeLeading, call, put,
} from 'redux-saga/effects';
import Sentry from '@sentry/react-native';
import { RESTful, RETURN_CODE, handleAlert } from '../utils';
import {
  getUserFailure,
  getUserRequest,
  getUserSuccess,
  postUserFailure,
  postUserRequest,
  postUserSuccess,
} from '../reducers/user';
import { setAccessToken, deleteAccessToken } from '../utils/auth';

function* workGetUser(action) {
  try {
    const { return_code, return_message, return_data } = yield call(RESTful, 'GET', '/user', action.payload);
    if (return_code === RETURN_CODE.SUCCESS) {
      yield put(getUserSuccess(return_data));
    } else {
      yield put(getUserFailure());
      yield handleAlert('로그인 실패', return_message, () => {
        deleteAccessToken();
      });
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
      return_code,
      return_message,
      return_data: { accessToken, ...rest },
    } = yield call(RESTful, 'POST', '/user', action.payload);
    if (return_code === RETURN_CODE.SUCCESS) {
      yield setAccessToken(accessToken);
      yield put(postUserSuccess({ ...rest }));
    } else {
      yield put(postUserFailure());
      yield handleAlert('회원가입 실패', return_message, () => {
        deleteAccessToken();
      });
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
