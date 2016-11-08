import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist'
import { AsyncStorage, Platform } from 'react-native';
import createSagaMiddleware from 'redux-saga';
import devTools from 'remote-redux-devtools';
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

  if (__DEV__) {
    enhancers.push(devTools({
      name: Platform.OS,
      hostname: 'localhost',
      port: 5678
    }));
  }

  const store = createStore(createReducer(), initialState, compose(...enhancers));

  persistStore(store, {storage: AsyncStorage, blacklist: ['topLevelNavigationReducer']});

  sagas.forEach(saga => sagaMiddleware.run(saga));

  return store;
}
