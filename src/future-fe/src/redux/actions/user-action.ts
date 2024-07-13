import { createAsyncThunk } from "@reduxjs/toolkit";
import { categoryApi } from "../../api/category.api";
import { userApi } from "../../api/user.api";

export const getCart = createAsyncThunk("cart", async (_body, thunkAPI) => {
  try {
    const response = await userApi.getItemCart();

    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addToCart = createAsyncThunk(
  "cart/add",
  async (body: AddToCart, thunkAPI) => {
    try {
      const response = await userApi.addToCart(body);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateQuantity = createAsyncThunk(
  "cart/update",
  async (body: UpdateQuantity, thunkAPI) => {
    try {
      const response = await userApi.updateQuantity(body);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteCart = createAsyncThunk(
  "cart/delete",
  async (productId: string, thunkAPI) => {
    try {
      const response = await userApi.deleteCart(productId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAllCart = createAsyncThunk(
  "cart/deleteAll",
  async (_data, thunkAPI) => {
    try {
      const response = await userApi.deleteAllCart();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
