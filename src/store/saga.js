// @flow
import { all } from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import transSaga from './trans/saga';
import globalSaga from './global/saga';

export default () => {
  function* rootSaga(): Saga {
    yield all([
      ...transSaga,
      ...globalSaga,
    ]);
  }
  return rootSaga;
};
