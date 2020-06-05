import {
  takeLeading, call, put,
} from 'redux-saga/effects';
import Sentry from '@sentry/react-native';
import { RESTful, RETURN_CODE } from '../utils';
import {
  sendVocFailure,
  sendVocRequest,
  sendVocSuccess,
} from '../reducers/voc';

function* workSendVoc(action) {
  try {
    const { return_code } = yield call(RESTful, 'POST', '/voc', action.payload);
    if (return_code === RETURN_CODE.SUCCESS) {
      yield put(sendVocSuccess());
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

function* watchSendVoc() {
  yield takeLeading(sendVocRequest, workSendVoc);
}

export default [watchSendVoc];
