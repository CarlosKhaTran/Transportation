// @flow
import * as constants from './constants';

const initState = {
  totalItem: null,
  storeInfo: {},
  limit: 20,
  currentPage: 1,
  bills: []
};

export default (state: Object = initState, action: { type: string, payload: Object }) => {
  switch (action.type) {
    case constants.GET_STORE_INFO_SUCCESS:
      return { ...state, storeInfo: action.payload };
    case constants.GET_LIST_BILLS_SUCCESS:
      return {
        ...state,
        currentPage: state.currentPage + 1,
        bills: [...state.bills, ...action.payload]
      };
    case constants.GET_TOTAL_BILLS_COUNT_SUCCESS:
      return {
        ...state,
        totalItem: action.payload
      };
    case constants.LOG_OUT:
      return {
        ...initState
      };
    default:
      return { ...state };
  }
};
