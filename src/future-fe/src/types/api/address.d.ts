declare interface IAddress {
  _id: string;
  default: boolean;
  district: string;
  phone: string;
  province: string;
  receiver: string;
  specificAddress: string;
  ward: string;
}

declare type CreateAddress = Omit<IAddress, "_id" | "default">;

declare type UpdateAddress = Partial<IAddress>;
