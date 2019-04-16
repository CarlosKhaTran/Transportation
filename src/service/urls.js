// @flow
import { HOST,USERNAME } from './config';

export const getListBillUrl = (storeID: string, date: string): string => `${HOST}/PhieuGiaoHang/getlist/${storeID}/${date}`;
export const putInsertBillUrl = (): string => `${HOST}/PhieuGiaoHang/InsertPGH?userName=${USERNAME}`;
export const putInsertRatingUrl = (): string => `${HOST}/Rating/Insert?userName=${USERNAME}`;
