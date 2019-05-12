// @flow
import { HOST, USERNAME } from './config';

export const getListBillUrl = (
  storeID: string,
  date: string,
  currentPage: number,
  limit: number
): string => `${HOST}api/PhieuGiaoHang/getlist/${storeID}/${date}/${limit}/${currentPage}`;
export const putInsertBillUrl = (): string => `${HOST}api/PhieuGiaoHang/InsertPGH?userName=${USERNAME}`;
export const putInsertRatingUrl = (): string => `${HOST}api/Rating/Insert?userName=${USERNAME}`;
export const requestLoginUrl = (): string => `${HOST}token`;
export const getTotalBillsCountUrl = (storeID: string, date: string): string => `${HOST}api/PhieuGiaoHang/TotalItem/${storeID}/${date}`;
export const getIssueListUrl = () => `${HOST}api/problem/gets`;
export const getStoreInfoUrl = (storeID: string) => `${HOST}api/store/getstore/${storeID}`;
export const addNewReportUrl = () => `${HOST}api/report/addnew`;
export const uploadImageUrl = (reportId: string) => `${HOST}api/attachment/uploadfile/${reportId}`;
