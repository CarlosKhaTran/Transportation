// @flow
import * as constants from './constants';

const initState = {
  issueList: []
};

export default (state: Object = initState, action: Object) => {
  switch (action.type) {
    case constants.GET_ISSUE_LIST_SUCCESS:
      return {
        ...state,
        issueList: action.payload
      };
    case constants.LOG_OUT:
      return {
        ...initState
      };
    default:
      return { ...state };
  }
};
