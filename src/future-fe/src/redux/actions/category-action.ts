import { createAsyncThunk } from "@reduxjs/toolkit";
import { categoryApi } from "../../api/category.api";

export const getCategories = createAsyncThunk(
  "categories",
  async (_body, thunkAPI) => {
    try {
      const response = await categoryApi.get();

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
