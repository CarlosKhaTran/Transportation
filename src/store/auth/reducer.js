// @flow
import * as constants from './constants';

const initState = {
  user: {
    storeID: null,
    accessToken: null
  }
};

export default (
  state: Object = initState,
  action: {
    type: string,
    payload: Object
  }
) => {
  switch (action.type) {
    case constants.RECEIVE_TOKEN:
      return { ...state, storeID: action.payload.storeID, accessToken: action.payload.accessToken };
    default:
      return { ...state };
  }
};
