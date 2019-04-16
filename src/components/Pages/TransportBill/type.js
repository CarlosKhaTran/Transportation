// @flow

export type Bill = {
  rowId: number,
  item_Code: string,
  item_Name: string,
  soBich: number,
  div_Unit: string,
  actual_Received: number,
  notes: ?string,
  delivery_Date: string,
};
