import mongoose, {
  Document,
  Model,
  Schema,
  SchemaTimestampsConfig,
  model,
} from "mongoose";

export interface IAddress {
  province: string;
  district: string;
  ward: string;
  specificAddress: string;
  phone: string;
  receiver: string;
  default: boolean;
  deleted: boolean;
}

export interface IAddressModel
  extends IAddress,
    Document,
    SchemaTimestampsConfig {}

export const AddressSchema: Schema = new Schema(
  {
    province: { type: String, require: true },
    district: { type: String, require: true },
    ward: { type: String, require: true },
    specificAddress: { type: String, require: true },
    phone: { type: String, require: true },
    receiver: { type: String, require: true },
    default: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Address = model<IAddressModel>("Address", AddressSchema);

export default Address;
