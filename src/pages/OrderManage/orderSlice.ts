import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import moment from 'moment'

interface OrderManageState {
  searchParams: any;
  pagination: any;
  tableData: any;
}

const initialState: OrderManageState = {
  searchParams: {
    order_no: 1234, create_time: moment(), order_date: [moment(), moment()]
  },
  pagination: {
    current: 1,
    pageSize: 3,
    total: 0
  },
  tableData: [
    {
      order_no: 123,
      create_time: '2020-12-12',
      order_date: '2020-12-12 ~ 2020-12-20',
      address: '华龙苑南里'
    },
    {
      order_no: 234,
      create_time: '2020-12-12',
      order_date: '2020-12-12 ~ 2020-12-20',
      address: '华龙苑南里'
    },
    {
      order_no: 345,
      create_time: '2020-12-12',
      order_date: '2020-12-12 ~ 2020-12-20',
      address: '华龙苑南里'
    },
    {
      order_no: 456,
      create_time: '2020-12-12',
      order_date: '2020-12-12 ~ 2020-12-20',
      address: '华龙苑南里'
    },
    {
      order_no: 567,
      create_time: '2020-12-12',
      order_date: '2020-12-12 ~ 2020-12-20',
      address: '华龙苑南里'
    }
  ]
};

export const orderSlice = createSlice({
  name: 'orderManage',
  initialState,
  reducers: {
    updateSearchParams: (state, action: PayloadAction<any>) => {
      state.searchParams = action.payload
    },
    updatePagination: (state, action: PayloadAction<any>) => {
      state.pagination = action.payload
    },
    updateTableData: (state, action: PayloadAction<any>) => {
      state.tableData = action.payload
    },
  },
});

export const { updateSearchParams, updatePagination, updateTableData } = orderSlice.actions;

export const selectOrderData = (state: RootState) => state.order;

export default orderSlice.reducer;
