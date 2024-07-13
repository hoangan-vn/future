import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { deleteWishlist, getWishlist } from "../actions/wishlist-action";

export interface WishlistState {
  wishlist: FavoriteProduct[];
}

const initialState: WishlistState = {
  wishlist: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      getWishlist.fulfilled,
      (state, action: PayloadAction<FavoriteProduct[]>) => {
        state.wishlist = [];
        state.wishlist = action.payload;
      }
    );
    builder.addCase(
      deleteWishlist.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.wishlist = state.wishlist.filter(
          (item) => item._id !== action.payload
        );
      }
    );
  },
});

// Action creators are generated for each case reducer function
export const selectWishlist = (state: RootState) => state.wishlist;
export default wishlistSlice.reducer;
