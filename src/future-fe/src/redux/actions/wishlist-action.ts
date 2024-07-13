import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "../../api/user.api";

export const getWishlist = createAsyncThunk(
  "wishlist/get",
  async (_body, thunkAPI) => {
    try {
      const res = await userApi.getWishlist();
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteWishlist = createAsyncThunk(
  "wishlist/delete",
  async (body: string, thunkAPI) => {
    try {
      const res = await userApi.deleteWishlistItem(body);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
