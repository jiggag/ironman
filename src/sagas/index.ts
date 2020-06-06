import { all, fork } from 'redux-saga/effects';
import note from './note';
import voc from './voc';
import user from './user';

const sagas = [...note, ...voc, ...user];

export default function* combineSagas() {
  try {
    yield all(sagas.map(saga => fork(saga)));
  } catch (e) {
    console.error(e);
  }
}
