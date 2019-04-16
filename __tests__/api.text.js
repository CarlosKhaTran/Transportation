import * as API from '../src/service/index';
import { fakedBill, fakedRatingContent } from '../src/service/fakedata';

test('putInsertBill',async () => {
    data = await API.putInsertBill({fakedBill})
    console.log(data)
})

test('putInsertBill',async () => {
    data = await API.putInsertBillRating({fakedRatingContent})
    console.log(data)
})
