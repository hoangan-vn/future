import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../redux/reducers/counter-slice";
import addressesSlice from "../redux/reducers/address-slice";
import categoriesSlice from "../redux/reducers/category-slice";
import cartSlice from "../redux/reducers/cart-slice";
import wishlistSlice from "../redux/reducers/wishlist-slice";
export const store = configureStore({
  reducer: {
    counter: counterSlice,
    addresses: addressesSlice,
    cart: cartSlice,
    categories: categoriesSlice,
    wishlist: wishlistSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
