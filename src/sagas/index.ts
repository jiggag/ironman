import { all, fork } from 'redux-saga/effects';

const sagas = [];

export default function* combineSagas() {
  yield all(sagas.map(saga => fork(saga)));
}
