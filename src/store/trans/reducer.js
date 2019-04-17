// @flow
import * as constants from './constants';

const initState = {
  bills: []
};

export default (state: Object = initState, action: { type: string, payload: Object }) => {
  switch (action.type) {
    case constants.GET_LIST_BILLS_SUCCESS:
      return { ...state, bills: action.payload };
    default:
      return { ...state };
  }
};
