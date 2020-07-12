import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import reducer from '../reducers';
import saga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

import { createStore, applyMiddleware } from 'redux';

const middlewares = [
  ...getDefaultMiddleware({ thunk: false, serializableCheck: false }),
  sagaMiddleware,
];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

const store = createStore(reducer, applyMiddleware(...middlewares));

sagaMiddleware.run(saga);

export default store;
