// eslint-disable-next-line import/no-extraneous-dependencies
import { configureStore } from '@reduxjs/toolkit';
// import your reducers here
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    // add more reducers here
  },
});

// Types for usage in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
