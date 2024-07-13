import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { getCategories } from "../actions/category-action";

export interface CategoriesState {
  categories: ICategory[];
}

const initialState: CategoriesState = {
  categories: [],
};

export const counterSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      getCategories.fulfilled,
      (state, action: PayloadAction<ICategory[]>) => {
        state.categories = action.payload;
      }
    );
  },
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const selectCategories = (state: RootState) =>
  state.categories.categories;
export default counterSlice.reducer;
