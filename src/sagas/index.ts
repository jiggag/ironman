import { all, fork } from 'redux-saga/effects';
import note from './note';

const sagas = [...note];

export default function* combineSagas() {
  yield all(sagas.map(saga => fork(saga)));
}
