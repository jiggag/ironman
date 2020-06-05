import { all, fork } from 'redux-saga/effects';
import note from './note';
import voc from './voc';

const sagas = [...note, ...voc];

export default function* combineSagas() {
  try {
    yield all(sagas.map(saga => fork(saga)));
  } catch (e) {
    console.error(e);
  }
}
