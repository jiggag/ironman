import { AsyncStorage } from 'react-native';
import Bugsnag from '@bugsnag/react-native';
import messaging from '@react-native-firebase/messaging';
import moment from 'moment';
import {
  select, call, put, takeEvery, takeLatest,
} from 'redux-saga/effects';
import _filter from 'lodash/filter';
import _find from 'lodash/find';
import _forEach from 'lodash/forEach';
import { LogEvent } from '@analytics/index';
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
} from '@reducers/note';
import { stateList, weatherList } from '@utils/common';
import { RESTful, RETURN_CODE } from '@utils/index';
import {
  NoteData, NoteReducer, RadioData, RootReducer,
} from '../types';

const format = (newList: NoteData[], originData: NoteReducer, page: number) => {
  const { list: oriList, graph: oriGraph } = originData;
  const list = page > 1 ? [...oriList] : [];
  const graph = page > 1 ? [...oriGraph] : [];
  graph.reverse();
  _forEach(newList, (data) => {
    list.push(data);
    graph.push(6 - data.state);
  });
  return { list, graph: graph.reverse(), page };
};

function* workGetList(action) {
  try {
    const { note }: RootReducer = yield select();
    const { page, limit } = note;
    const newPage = action.payload ? page + 1 : 1;
    const { return_code: returnCode, return_data: returnData } = yield call(RESTful, 'GET', '/list', {
      page: newPage,
      limit,
    });
    if (returnCode === RETURN_CODE.SUCCESS) {
      const formatted = yield call(format, returnData, note, newPage);
      yield put(getListSuccess(formatted));
    } else {
      console.error('%c%s', 'background: #00ff00; color: #ffffff', '[GET] (list note)', '\n', 'api return errpr');
      yield put(getListFailure({}));
    }
  } catch (e) {
    Bugsnag.notify(e);
    console.error('%c%s', 'background: #00ff00; color: #ffffff', '[GET] (list note)', '\n', e);
    yield put(getListFailure({}));
  }
}
function* workGetNote(action) {
  try {
    const {
      note: { list },
    } = yield select();
    const filtered = _filter(list, ({ id }) => id === action.payload);
    if (filtered.length) {
      const {
        state, weather, food, done, ...rest
      } = filtered[0];
      const { value: stateText } = _find(stateList, { id: state }) as RadioData;
      const { value: weatherText } = _find(weatherList, { id: weather }) as RadioData;
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
      yield put(getNoteFailure({}));
    }
  } catch (e) {
    Bugsnag.notify(e);
    console.error('%c%s', 'background: #00ff00; color: #ffffff', '[POST] (detail note)', '\n', e);
    yield put(getNoteFailure({}));
  }
}
function* workDeleteNote(action) {
  try {
    const { id, callback } = action.payload;
    const { return_code: returnCode } = yield call(RESTful, 'POST', '/deleteNote', { id });
    if (returnCode === RETURN_CODE.SUCCESS) {
      yield call(callback);
      yield put(deleteNoteSuccess(id));
    } else {
      console.error('%c%s', 'background: #00ff00; color: #ffffff', '[POST] (/deleteNote)', '\n', 'api error');
      yield put(deleteNoteFailure({}));
    }
  } catch (e) {
    Bugsnag.notify(e);
    console.error('%c%s', 'background: #00ff00; color: #ffffff', '[POST] (/deleteNote)', '\n', e);
    yield put(deleteNoteFailure({}));
  }
}
function* workCreateNote(action) {
  try {
    const { note, cbSuccess, cbFailure } = action.payload;
    const { return_code: returnCode, return_message: returnMessage } = yield call(RESTful, 'POST', '/note', note);
    if (returnCode === RETURN_CODE.SUCCESS) {
      LogEvent('create_note');

      const registTopic = yield call(AsyncStorage.getItem, '@topic');
      if (moment(registTopic, 'YYYYMMDD').isBefore(note.date)) {
        const topic = moment(note.date).format('YYYYMMDD');
        yield call(AsyncStorage.setItem, '@topic', topic);
        yield messaging()
          .subscribeToTopic(topic)
          .then(() => console.log(`Subscribed to ${topic} topic!`));
      }

      yield call(cbSuccess);
      yield put(createNoteSuccess(note));
    } else {
      console.error('%c%s', 'background: #00ff00; color: #ffffff', '[POST] (/note)', '\n', 'api error');
      yield call(cbFailure, returnMessage);
      yield put(createNoteFailure({}));
    }
  } catch (e) {
    Bugsnag.notify(e);
    console.error('%c%s', 'background: #00ff00; color: #ffffff', '[POST] (/note)', '\n', e);
    yield put(createNoteFailure({}));
  }
}
function* workUpdateNote(action) {
  try {
    const { note, cbSuccess, cbFailure } = action.payload;
    const { return_code: returnCode, return_message: returnMessage } = yield call(RESTful, 'PUT', '/note', note);
    if (returnCode === RETURN_CODE.SUCCESS) {
      yield call(cbSuccess);
      yield put(updateNoteSuccess(note));
    } else {
      console.error('%c%s', 'background: #00ff00; color: #ffffff', '[PUT] (/note)', '\n', 'api error');
      yield call(cbFailure, returnMessage);
      yield put(updateNoteFailure({}));
    }
  } catch (e) {
    Bugsnag.notify(e);
    console.error('%c%s', 'background: #00ff00; color: #ffffff', '[PUT] (/note)', '\n', e);
    yield put(updateNoteFailure({}));
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
