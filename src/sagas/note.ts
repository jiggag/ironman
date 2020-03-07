import { select, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import _find from 'lodash/find';
import { RESTful } from '../utils';
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

const format = (list, graph, page) => {
  const newList = page > 1 ? list : [];
  const newGraph = page > 1 ? graph : [];
  for (const data of list) {
    newList.push({ id: newList.length + 1, ...data });
    newGraph.push(6 - data.state);
  }
  return { list: newList, graph: newGraph.reverse() };
};

function* workGetList(action) {
  try {
    const page = action.payload;
    const {
      note: { graph },
    } = yield select();
    const { return_code, return_data } = yield call(RESTful, 'GET', '/list', { page });
    if (return_code === 200) {
      const formatted = yield call(format, return_data, graph, page);
      yield put(getListSuccess(formatted));
    } else {
      console.error('%c%s', 'background: #00ff00; color: #ffffff', '[GET] (list note)', '\n', 'api return errpr');
      yield put(getListFailure());
    }
  } catch (e) {
    console.error('%c%s', 'background: #00ff00; color: #ffffff', '[GET] (dlistetail note)', '\n', e);
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
      const { state, weather, food, done, ...rest } = filtered[0];
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
        })
      );
    } else {
      console.error('%c%s', 'background: #00ff00; color: #ffffff', '[POST] (detail note)', '\n', 'not found data');
      yield put(getNoteFailure());
    }
  } catch (e) {
    console.error('%c%s', 'background: #00ff00; color: #ffffff', '[POST] (detail note)', '\n', e);
    yield put(getNoteFailure());
  }
}
function* workDeleteNote(action) {
  try {
    const { id, callback } = action.payload;
    const { return_code } = yield call(RESTful, 'POST', `/deleteNote`, { id });
    if (return_code === 200) {
      yield call(callback);
      yield put(deleteNoteSuccess(id));
    } else {
      console.error('%c%s', 'background: #00ff00; color: #ffffff', '[POST] (/deleteNote)', '\n', 'api error');
      yield put(deleteNoteFailure());
    }
  } catch (e) {
    console.error('%c%s', 'background: #00ff00; color: #ffffff', '[POST] (/deleteNote)', '\n', e);
    yield put(deleteNoteFailure());
  }
}
function* workCreateNote(action) {
  try {
    const { note, cbSuccess, cbFailure } = action.payload;
    const { return_code, return_message } = yield call(RESTful, 'POST', '/note', note);
    if (return_code === 200) {
      yield call(cbSuccess);
      yield put(createNoteSuccess(note));
    } else {
      console.error('%c%s', 'background: #00ff00; color: #ffffff', '[POST] (/note)', '\n', 'api error');
      yield call(cbFailure, return_message);
      yield put(createNoteFailure());
    }
  } catch (e) {
    console.error('%c%s', 'background: #00ff00; color: #ffffff', '[POST] (/note)', '\n', e);
    yield put(createNoteFailure());
  }
}
function* workUpdateNote(action) {
  try {
    const { note, cbSuccess, cbFailure } = action.payload;
    const { return_code, return_message } = yield call(RESTful, 'PUT', `/note`, note);
    if (return_code === 200) {
      yield call(cbSuccess);
      yield put(updateNoteSuccess(note));
    } else {
      console.error('%c%s', 'background: #00ff00; color: #ffffff', '[PUT] (/note)', '\n', 'api error');
      yield call(cbFailure, return_message);
      yield put(updateNoteFailure());
    }
  } catch (e) {
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
