import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import {
  createStore, applyMiddleware, compose, combineReducers
} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import { authStore, transStore, commonStore } from './reducer';
import createSaga from './saga';
import * as transActions from './trans/actions';
import * as authActions from './auth/actions';
import * as commonActions from './common/actions';

const config = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['transStore']
};

const createReducers = () => persistReducer(
  config,
  combineReducers({
    authStore,
    transStore,
    commonStore
  })
);

const createMiddlewares = (sagaMiddleware) => {
  const middlewares = [];

  // Saga Middleware
  if (sagaMiddleware) {
    middlewares.push(sagaMiddleware);
  }
  return applyMiddleware.apply({}, middlewares);
};

const buildStore = (reducers, initialState) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    createReducers(reducers),
    initialState,
    compose(createMiddlewares(sagaMiddleware))
  );

  const persistor = persistStore(store);
  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(createReducers(reducers));
    });
  }

  store.reducers = createReducers(reducers);
  sagaMiddleware.run(createSaga());
  return { persistor, store };
};

export default buildStore();
export const actions = {
  ...transActions,
  ...authActions,
  ...commonActions
};
