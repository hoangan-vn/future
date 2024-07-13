import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import {
  createAddress,
  deleteAddress,
  getAddresses,
  updateAddress,
} from "../actions/address-action";

export interface AddressesState {
  addresses: IAddress[];
}

const initialState: AddressesState = {
  addresses: [],
};

export const addressesSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      getAddresses.fulfilled,
      (state, action: PayloadAction<IAddress[]>) => {
        state.addresses = action.payload;
      }
    );
    builder.addCase(
      createAddress.fulfilled,
      (state, action: PayloadAction<IAddress>) => {
        state.addresses.push(action.payload);
      }
    );
    builder.addCase(
      updateAddress.fulfilled,
      (state, action: PayloadAction<IAddress>) => {
        if (action.payload.default === true) {
          for (const address of state.addresses) {
            address.default = false;
          }
        }

        const address = state.addresses.find(
          (item) => item._id === action.payload._id
        );
        if (address) {
          address.default = action.payload.default;
          address.district = action.payload.district;
          address.phone = action.payload.phone;
          address.province = action.payload.province;
          address.receiver = action.payload.receiver;
          address.ward = action.payload.ward;
          address.specificAddress = action.payload.specificAddress;
        }
      }
    );
    builder.addCase(
      deleteAddress.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.addresses = state.addresses.filter(
          (item) => item._id !== action.payload
        );
      }
    );
  },
});

// Action creators are generated for each case reducer function
export const selectAddresses = (state: RootState) => state.addresses;
export default addressesSlice.reducer;
