// @flow
import { takeLatest, call, put } from 'redux-saga/effects';
import _ from 'lodash';
import type { Saga } from 'redux-saga';
import * as constants from './constants';
import { getIssueList } from '../../service';
import * as globalActions from '../global/actions';

function* inGetIssueList() {
  try {
    yield put(globalActions.startLoading());
    const data = yield call(getIssueList);
    if (!_.isEmpty(data) && !data.error) {
      yield put({
        type: constants.GET_ISSUE_LIST_SUCCESS,
        payload: data
      });
    }
    yield put(globalActions.endLoading());
  } catch (error) {
    yield put(globalActions.startLoading());
    // const { cb } = action.payload;
    // cb(false);
    // yield put(globalActions.endLoading());
  }
}

function* getIusseListSaga(): Saga {
  yield takeLatest(constants.GET_ISSUE_LIST, inGetIssueList);
}

export default [getIusseListSaga()];
