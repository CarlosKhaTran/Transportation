// @flow
import Axios from 'axios';
import qs from 'querystring';
import * as urls from './urls';
import { TIMEOUT } from './config';
import type { Bill } from '../components/Pages/TransportBill/type';

Axios.defaults.timeout = TIMEOUT;
Axios.defaults.headers.common['Content-Type'] = 'application/json';

export async function getListBill({
  storeID,
  date,
  currentPage,
  limit
}: {
  storeID: string,
  date: string,
  currentPage: number,
  limit: number
}) {
  try {
    const url = urls.getListBillUrl(storeID, date, currentPage, limit);
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
    const response = await Axios.put(url, ratingContent);
    const { data } = response;
    return data.items;
  } catch (error) {
    console.log('Insert Bill Error', error);
    return undefined;
  }
}

export async function requestToken({ username, password }: { username: String, password: string }) {
  try {
    const url = urls.requestLoginUrl();
    const response = await Axios.post(
      url,
      qs.stringify({
        userName: username,
        password,
        client_id: 'mobile',
        grant_type: 'password'
      }),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.log('Login Error', error);
    return undefined;
  }
}

export async function getStoreInfo({ storeID }: { storeID: string }) {
  try {
    const url = urls.getStoreInfoUrl(storeID);
    const response = await Axios.get(url);
    return response.data.store;
  } catch (error) {
    console.log('Get store info error', error);
    return undefined;
  }
}

export async function getTotalBillsCount({ storeID, date }: { storeID: string, date: string }) {
  try {
    const url = urls.getTotalBillsCountUrl(storeID, date);
    const response = await Axios.get(url);
    const { data } = response;
    return data.totalItems;
  } catch (error) {
    console.log('Get list bill error', error);
    return undefined;
  }
}

export async function getIssueList() {
  try {
    const url = urls.getIssueListUrl();
    const response = await Axios.get(url);
    const { data } = response;
    return data.problems;
  } catch (error) {
    console.log('Get list error error', error);
    return undefined;
  }
}

export async function addNewReport({
  issue,
  note,
  storeID
}: {
  issue: string,
  storeID: string,
  note: string
}) {
  try {
    const url = urls.addNewReportUrl();
    const response = await Axios.post(url, {
      ProblemId: issue,
      Note: note,
      Store_Code: storeID
    });
    const { data } = response;
    return data.id;
  } catch (error) {
    throw error;
  }
}

export async function uploadImage({ image, reportId }: { image: Object, reportId: string }) {
  try {
    const url = urls.uploadImageUrl(reportId);
    const data: any = new FormData();
    console.log('xxxx', image);
    data.append('', {
      uri: image.path,
      type: image.mime,
      name: image.path
    });
    const response = await Axios.post(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
