// @flow

import * as constants from './constants';

export const getListBill = () => ({
  type: constants.GET_LIST_BILLS
});

export const geStoreInfo = (storeID: String, cb: (iSuccess: boolean) => void) => ({
  type: constants.GET_STORE_INFO,
  payload: {
    storeID,
    cb
  }
});

export const getTotalBillsCount = () => ({
  type: constants.GET_TOTAL_BILLS_COUNT
});
