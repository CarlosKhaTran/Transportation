// @flow
import Axios from 'axios';
import * as urls from './urls';
import type { Bill } from '../components/Pages/TransportBill/type';

export async function getListBill({ storeID, date }: { storeID: string, date: string }) {
  try {
    const url = urls.getListBillUrl(storeID, date);
    const response = await Axios.get(url);
    const { data } = response;
    return data.items;
  } catch (error) {
    console.log('Get list bill error', error);
    return undefined;
  }
}

export async function putInsertBill({ bill }: { bill: Array<Bill> }) {
  try {
    const url = urls.putInsertBillUrl();
    const response = await Axios.put(url, bill);
    const { data } = response;
    return data.items;
  } catch (error) {
    console.log('Insert Bill Error', error);
    return undefined;
  }
}

export async function putInsertBillRating({ ratingContent }: Object) {
  try {
    const url = urls.putInsertRatingUrl();
    console.log(ratingContent)
    const response = await Axios.put(url, ratingContent);
    const { data } = response;
    return data.items;
  } catch (error) {
    console.log('Insert Bill Error', error);
    return undefined;
  }
}
