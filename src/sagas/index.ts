import { all, fork } from 'redux-saga/effects';
import _map from 'lodash/map';
import note from './note';
import user from './user';
import voc from './voc';

const sagas = [...note, ...voc, ...user];

export default function* combineSagas() {
  try {
    yield all(_map(sagas, fork));
  } catch (e) {
    console.error(e);
  }
}
