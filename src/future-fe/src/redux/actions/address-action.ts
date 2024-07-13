import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "../../api/user.api";
import { addressApi } from "../../api/address.api";

export const getAddresses = createAsyncThunk(
  "addresses",
  async (_body, thunkAPI) => {
    try {
      const response = await userApi.getAddresses();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAddress = createAsyncThunk(
  "addresses/create",
  async (body: CreateAddress, thunkAPI) => {
    try {
      const response = await addressApi.create(body);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAddress = createAsyncThunk(
  "addresses/update",
  async (body: UpdateAddress, thunkAPI) => {
    try {
      const response = await addressApi.update(body);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "addresses/delete",
  async (id: string, thunkAPI) => {
    try {
      const response = await addressApi.delete(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
