import * as constants from './constants';

export const getIssueList = () => ({
  type: constants.GET_ISSUE_LIST
});

export const reset = () => ({
  type: constants.RESET
});
