// @flow
import {
  takeLatest, call, put, select
} from 'redux-saga/effects';
import _ from 'lodash';
import type { Saga } from 'redux-saga';
import moment from 'moment';
import * as constants from './constants';
import * as globalActions from '../global/actions';
import { getListBill, getStoreInfo, getTotalBillsCount } from '../../service';

function* onGetListBills() {
  try {
    const bills = yield select(store => store.transStore.bills);
    if (bills.length === 0) yield put(globalActions.startLoading());
    const date = moment().format('YYYY-MM-DD');
    const storeID = yield select(store => store.transStore.storeInfo.storeID);

    const currentPage = yield select(store => store.transStore.currentPage);
    const limit = yield select(store => store.transStore.limit);
    const data = yield call(getListBill, {
      storeID,
      date,
      currentPage,
      limit
    });
    if (!_.isEmpty(data)) {
      yield put({
        type: constants.GET_LIST_BILLS_SUCCESS,
        payload: data
      });
    }
    yield put(globalActions.endLoading());
  } catch (error) {
    yield put(globalActions.endLoading());
  }
}

function* onGetStoreInfo({
  payload
}: {
  payload: { storeID: string, cb: (isSuccess: boolean) => void }
}) {
  try {
    yield put(globalActions.startLoading());
    const { storeID, cb } = payload;
    const data = yield call(getStoreInfo, { storeID });
    if (!_.isEmpty(data)) {
      yield put({
        type: constants.GET_STORE_INFO_SUCCESS,
        payload: {
          ...data,
          storeID
        }
      });
      cb(true);
      yield put(globalActions.endLoading());
      return;
    }
    cb(false);
    yield put(globalActions.endLoading());
  } catch (error) {
    console.log('xxx', error);
    yield put(globalActions.endLoading());
  }
}

function* onGetTotalBillCount() {
  try {
    const storeID = yield select(store => store.transStore.storeInfo.storeID);
    const date = moment().format('YYYY-MM-DD');
    const data = yield call(getTotalBillsCount, { storeID, date });
    if (typeof data === 'number') {
      yield put({
        type: constants.GET_TOTAL_BILLS_COUNT_SUCCESS,
        payload: data
      });
    }
  } catch (error) {
    console.log('get total count Error');
  }
}

function* getStoreInfoSaga(): Saga {
  yield takeLatest(constants.GET_STORE_INFO, onGetStoreInfo);
}

function* getListBillSaga(): Saga {
  yield takeLatest(constants.GET_LIST_BILLS, onGetListBills);
}

function* getTotalBillsCountSaga(): Saga {
  yield takeLatest(constants.GET_TOTAL_BILLS_COUNT, onGetTotalBillCount);
}

export default [getListBillSaga(), getStoreInfoSaga(), getTotalBillsCountSaga()];
