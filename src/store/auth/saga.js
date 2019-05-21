// @flow
import { takeLatest, call, put } from 'redux-saga/effects';
import _ from 'lodash';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import type { Saga } from 'redux-saga';
import * as constants from './constants';
import { requestToken } from '../../service';
import * as globalActions from '../global/actions';

function* onRequestLogin(action: {
  payload: {
    username: string,
    password: string,
    cb: (isSucess: boolean) => void
  }
}) {
  try {
    const { username, password, cb } = action.payload;
    yield put(globalActions.startLoading());
    const data = yield call(requestToken, { username, password });
    if (!_.isEmpty(data) && !data.error) {
      axios.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;
      AsyncStorage.setItem('accessToken', `Bearer ${data.access_token}`);
      yield put({
        type: constants.RECEIVE_TOKEN,
        payload: {
          accessToken: `Bearer ${data.access_token}`
        }
      });
      cb(true);
    } else {
      cb(false);
    }
    yield put(globalActions.endLoading());
  } catch (error) {
    yield put(globalActions.startLoading());
  }
}

function* requestLogin(): Saga {
  yield takeLatest(constants.REQUEST_LOG_IN, onRequestLogin);
}

export default [requestLogin()];
