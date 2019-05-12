// @flow
import * as constants from './constants';

export const requestLogin = ({ username, password, cb }: Object) => ({
  type: constants.REQUEST_LOG_IN,
  payload: {
    username,
    password,
    cb
  }
});
