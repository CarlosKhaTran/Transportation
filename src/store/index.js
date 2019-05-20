import {
  applyMiddleware, compose, createStore, combineReducers
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
// import storage from 'redux-persist/lib/storage';
import { authStore, transStore, commonStore } from './reducer';
import * as transActions from './trans/actions';
import * as authActions from './auth/actions';
import * as commonActions from './common/actions';
import createSaga from './saga';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
};

// creates the store
export default (() => {
  /* ------------- Redux Configuration ------------- */
  const middleware = [];
  const enhancers = [];

  /* ------------- Saga Middleware ------------- */
  const sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);

  /* ------------- Assemble Middleware ------------- */
  enhancers.push(applyMiddleware(...middleware));

  const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({ authStore, transStore, commonStore })
  );
  const store = createStore(persistedReducer, compose(...enhancers));
  const persistor = persistStore(store);

  // kick off root saga
  sagaMiddleware.run(createSaga());

  return { store, persistor };
})();

export const actions = {
  ...transActions,
  ...authActions,
  ...commonActions
};
