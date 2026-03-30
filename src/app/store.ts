import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../feature/auth/authSlice';
import cartReducer from '../feature/cart/cartSlice';
import wishlistReducer from '../feature/wishlist/wishlistSlice';
import productsReducer from '../feature/product/productsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    products: productsReducer,
  },
});

// Types for TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
