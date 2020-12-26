import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../pages/Counter/counterSlice';
import orderReducer from '../pages/OrderManage/orderSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    order: orderReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
