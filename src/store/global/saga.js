// @flow
import { takeLatest } from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import * as constants from './constants';
import { Loading } from '../../components/Global';

function startLoading() {
  Loading.show();
}

function endLoading() {
  Loading.hide();
}

function* startLoadingSaga(): Saga {
  yield takeLatest(constants.START_LOADING, startLoading);
}

function* endLoadingSaga(): Saga {
  yield takeLatest(constants.END_LOADING, endLoading);
}

export default [startLoadingSaga(), endLoadingSaga()];
