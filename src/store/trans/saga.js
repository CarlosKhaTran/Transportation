// @flow
import { takeLatest, call, put } from 'redux-saga/effects';
import _ from 'lodash';
import type { Saga } from 'redux-saga';
import moment from 'moment';
import * as constants from './constants';
import * as globalActions from '../global/actions';
import { getListBill } from '../../service';

function* onGetListBills(action: {
  payload: { storeID: string, cb: (isSuccess: boolean) => void }
}) {
  try {
    yield put(globalActions.startLoading());
    const { storeID, cb } = action.payload;
    const date = moment().format('YYYY-MM-DD');
    const data = yield call(getListBill, { storeID, date });
    if (!_.isEmpty(data)) {
      yield put({
        type: constants.GET_LIST_BILLS_SUCCESS,
        payload: data
      });
      cb(true);
    } else {
      cb(false);
    }
    yield put(globalActions.endLoading());
  } catch (error) {
    const { cb } = action.payload;
    cb(false);
    yield put(globalActions.endLoading());
  }
}

function* getListBillSaga(): Saga {
  yield takeLatest(constants.GET_LIST_BILLS, onGetListBills);
}

export default [getListBillSaga()];
