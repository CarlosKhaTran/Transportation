// @flow
import { HOST } from './config';

export const getListBillUrl = (storeID: string, date: string): string => `${HOST}/PhieuGiaoHang/getlist/${storeID}/${date}`;
