import * as constants from './constants';

export const getIssueList = () => ({
  type: constants.GET_ISSUE_LIST
});

export const logOut = () => ({
  type: constants.LOG_OUT
});
