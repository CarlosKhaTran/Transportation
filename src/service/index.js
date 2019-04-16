// @flow
import Axios from 'axios';
import * as urls from './urls';

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
