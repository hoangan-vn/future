import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import {
  addToCart,
  deleteAllCart,
  deleteCart,
  getCart,
  updateQuantity,
} from "../actions/user-action";

const initialState: CartItem[] = [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(
        getCart.fulfilled,
        (state, action: PayloadAction<CartItem[]>) => {
          state.splice(0, state.length);
          state.push(...action.payload);
        }
      )
      .addCase(
        addToCart.fulfilled,
        (state, action: PayloadAction<CartItem>) => {
          const existProduct = state.find(
            (cartItem) => cartItem._id === action.payload._id
          );
          if (existProduct) {
            existProduct.quantity = action.payload.quantity;
          } else {
            state.push(action.payload);
          }
        }
      )
      .addCase(
        updateQuantity.fulfilled,
        (state, action: PayloadAction<UpdateQuantity>) => {
          const product = state.find(
            (cartItem) => cartItem._id === action.payload.productId
          );
          if (product) {
            if (action.payload.action === "increment") {
              product.quantity += 1;
            } else if (action.payload.action === "decrement") {
              product.quantity -= 1;
            }
          }
        }
      )
      .addCase(deleteCart.fulfilled, (state, action: PayloadAction<string>) => {
        const deleteItemCart = state.findIndex(
          (item) => item._id === action.payload
        );
        if (deleteItemCart > -1) {
          state.splice(deleteItemCart, 1);
        }
      })
      .addCase(
        deleteAllCart.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.splice(0, state.length);
        }
      );
  },
});

// Action creators are generated for each case reducer function
// export const { } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart;
export default cartSlice.reducer;
