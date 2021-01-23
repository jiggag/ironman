import AsyncStorage from '@react-native-community/async-storage';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { createStore, applyMiddleware } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import reducer from '../reducers';
import saga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [...getDefaultMiddleware({ thunk: false, serializableCheck: false }), sagaMiddleware];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [],
};

const persistedReducer = persistReducer(persistConfig, reducer);
const createAppStore = () => {
  const store = createStore(persistedReducer, applyMiddleware(...middlewares));
  sagaMiddleware.run(saga);
  return store;
};
const store = createAppStore();
const persistor = persistStore(store);

export { store, persistor };
