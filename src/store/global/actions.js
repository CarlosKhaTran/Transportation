// @flow

import * as constants from './constants';

export const startLoading = () => ({
  type: constants.START_LOADING,
});

export const endLoading = () => ({
  type: constants.END_LOADING,
});
