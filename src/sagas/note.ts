import {
  select, call, put, takeEvery, takeLatest,
} from 'redux-saga/effects';
import _find from 'lodash/find';
import Sentry from '@sentry/react-native';
import { RESTful, RETURN_CODE } from '../utils';
import {
  getListRequest,
  getListSuccess,
  getListFailure,
  getNoteRequest,
  getNoteSuccess,
  getNoteFailure,
  createNoteRequest,
  createNoteSuccess,
  createNoteFailure,
  deleteNoteRequest,
  deleteNoteSuccess,
  deleteNoteFailure,
  updateNoteRequest,
  updateNoteSuccess,
  updateNoteFailure,
} from '../reducers/note';
import { stateList, weatherList } from '../utils/common';

const format = (newList, originData, page) => {
  const { list: oriList, graph: oriGraph } = originData;
  const list = [].concat(page > 1 ? oriList : []);
  const graph = [].concat(page > 1 ? oriGraph : []);
  graph.reverse();
  for (const data of newList) {
    list.push(data);
    graph.push(6 - data.state);
  }
  return { list, graph: graph.reverse(), page };
};

function* workGetList(action) {
  try {
    const { note } = yield select();
    const { page, limit } = note;
    const newPage = action.payload ? page + 1 : 1;
    const { return_code, return_data } = yield call(RESTful, 'GET', '/list', { page: newPage, limit });
    if (return_code === 200) {
      const formatted = yield call(format, return_data, note, newPage);
      yield put(getListSuccess(formatted));
    } else {
      console.error('%c%s', 'background: #00ff00; color: #ffffff', '[GET] (list note)', '\n', 'api return errpr');
      yield put(getListFailure());
    }
  } catch (e) {
    yield Sentry.captureException(e);
    console.error('%c%s', 'background: #00ff00; color: #ffffff', '[GET] (list note)', '\n', e);
    yield put(getListFailure());
  }
}
function* workGetNote(action) {
  try {
    const {
      note: { list },
    } = yield select();
    const filtered = list.filter(({ id }) => id === action.payload);
    if (filtered.length) {
      const {
        state, weather, food, done, ...rest
      } = filtered[0];
      const { value: stateText } = yield _find(stateList, { id: state });
      const { value: weatherText } = yield _find(weatherList, { id: weather });
      yield put(
        getNoteSuccess({
          ...rest,
          state,
          weather,
          stateText,
          weatherText,
          food: JSON.parse(food),
          done: JSON.parse(done),
        }),
      );
    } else {
      console.error('%c%s', 'background: #00ff00; color: #ffffff', '[POST] (detail note)', '\n', 'not found data');
      yield put(getNoteFailure());
    }
  } catch (e) {
    yield Sentry.captureException(e);
    console.error('%c%s', 'background: #00ff00; color: #ffffff', '[POST] (detail note)', '\n', e);
    yield put(getNoteFailure());
  }
}
function* workDeleteNote(action) {
  try {
    const { id, callback } = action.payload;
    const { return_code } = yield call(RESTful, 'POST', '/deleteNote', { id });
    if (return_code === RETURN_CODE.SUCCESS) {
      yield call(callback);
      yield put(deleteNoteSuccess(id));
    } else {
      console.error('%c%s', 'background: #00ff00; color: #ffffff', '[POST] (/deleteNote)', '\n', 'api error');
      yield put(deleteNoteFailure());
    }
  } catch (e) {
    yield Sentry.captureException(e);
    console.error('%c%s', 'background: #00ff00; color: #ffffff', '[POST] (/deleteNote)', '\n', e);
    yield put(deleteNoteFailure());
  }
}
function* workCreateNote(action) {
  try {
    const { note, cbSuccess, cbFailure } = action.payload;
    const { return_code, return_message } = yield call(RESTful, 'POST', '/note', note);
    if (return_code === RETURN_CODE.SUCCESS) {
      yield call(cbSuccess);
      yield put(createNoteSuccess(note));
    } else {
      console.error('%c%s', 'background: #00ff00; color: #ffffff', '[POST] (/note)', '\n', 'api error');
      yield call(cbFailure, return_message);
      yield put(createNoteFailure());
    }
  } catch (e) {
    yield Sentry.captureException(e);
    console.error('%c%s', 'background: #00ff00; color: #ffffff', '[POST] (/note)', '\n', e);
    yield put(createNoteFailure());
  }
}
function* workUpdateNote(action) {
  try {
    const { note, cbSuccess, cbFailure } = action.payload;
    const { return_code, return_message } = yield call(RESTful, 'PUT', '/note', note);
    if (return_code === RETURN_CODE.SUCCESS) {
      yield call(cbSuccess);
      yield put(updateNoteSuccess(note));
    } else {
      console.error('%c%s', 'background: #00ff00; color: #ffffff', '[PUT] (/note)', '\n', 'api error');
      yield call(cbFailure, return_message);
      yield put(updateNoteFailure());
    }
  } catch (e) {
    yield Sentry.captureException(e);
    console.error('%c%s', 'background: #00ff00; color: #ffffff', '[PUT] (/note)', '\n', e);
    yield put(updateNoteFailure());
  }
}

function* watchGetList() {
  yield takeEvery(getListRequest, workGetList);
}
function* watchGetNote() {
  yield takeEvery(getNoteRequest, workGetNote);
}
function* watchDeleteNote() {
  yield takeLatest(deleteNoteRequest, workDeleteNote);
}
function* watchCreateNote() {
  yield takeLatest(createNoteRequest, workCreateNote);
}
function* watchUpdateNote() {
  yield takeLatest(updateNoteRequest, workUpdateNote);
}

export default [watchGetList, watchGetNote, watchDeleteNote, watchCreateNote, watchUpdateNote];
