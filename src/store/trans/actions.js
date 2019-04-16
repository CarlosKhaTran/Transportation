// @flow

import * as constants from './constants';

export const getListBill = (storeID: string, cb: (isSuccess: boolean) => void) => ({
  type: constants.GET_LIST_BILLS,
  payload: {
    storeID,
    cb,
  }
});
