import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist'
import { AsyncStorage, Platform } from 'react-native';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';
import sagas from '../sagas';
import Settings from '../settings';

const settings = Settings.load();

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}) {
  const enhancers = [
    applyMiddleware(sagaMiddleware),
    autoRehydrate()
  ];

  const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const store = createStore(createReducer(), initialState, composer(...enhancers));

  persistStore(store, {storage: AsyncStorage, blacklist: []});

  sagas.forEach(saga => sagaMiddleware.run(saga));

  return store;
}
