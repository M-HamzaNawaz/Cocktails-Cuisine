import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../feature/auth/authSlice';
import cartReducer from '../feature/cart/cartSlice';
import wishlistReducer from '../feature/wishlist/wishlistSlice';
import productsReducer from '../feature/product/productsSlice';
import { STORAGE_KEYS } from '../utils/constant';
import { saveState } from '../utils/storage';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    products: productsReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();

  saveState(STORAGE_KEYS.USER_DATA, state.auth);
  saveState(STORAGE_KEYS.CART, state.cart);
  saveState(STORAGE_KEYS.WISHLIST, state.wishlist);
});

// Types for TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
