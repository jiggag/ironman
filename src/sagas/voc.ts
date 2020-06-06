import {
  takeLeading, call, put,
} from 'redux-saga/effects';
import Sentry from '@sentry/react-native';
import { RESTful, RETURN_CODE } from '../utils';
import {
  sendVocFailure,
  sendVocRequest,
  sendVocSuccess,
  getVocFailure,
  getVocRequest,
  getVocSuccess,
} from '../reducers/voc';

function* workSendVoc(action) {
  try {
    const { data, cb } = action.payload;
    const { return_code } = yield call(RESTful, 'POST', '/voc', data);
    if (return_code === RETURN_CODE.SUCCESS) {
      yield put(sendVocSuccess());
      yield call(cb);
    } else {
      console.error('%c%s', 'background: #00ff00; color: #ffffff', '[POST] (/voc)', '\n', 'api error');
      yield put(sendVocFailure());
    }
  } catch (e) {
    yield Sentry.captureException(e);
    console.error('%c%s', 'background: #00ff00; color: #ffffff', '[POST] (/voc)', '\n', e);
    yield put(sendVocFailure());
  }
}


function* workGetVoc(action) {
  try {
    const { return_code, return_data } = yield call(RESTful, 'GET', '/voc', action.payload);
    if (return_code === RETURN_CODE.SUCCESS) {
      yield put(getVocSuccess(return_data));
    } else {
      console.error('%c%s', 'background: #00ff00; color: #ffffff', '[GET] (/voc)', '\n', 'api error');
      yield put(getVocFailure());
    }
  } catch (e) {
    yield Sentry.captureException(e);
    console.error('%c%s', 'background: #00ff00; color: #ffffff', '[GET] (/voc)', '\n', e);
    yield put(getVocFailure());
  }
}

function* watchSendVoc() {
  yield takeLeading(sendVocRequest, workSendVoc);
}

function* watchGetVoc() {
  yield takeLeading(getVocRequest, workGetVoc);
}
export default [watchSendVoc, watchGetVoc];
