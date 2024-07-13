export class CreateAddressDTO {
  province: string;
  district: string;
  ward: string;
  specificAddress: string;
  phone: string;
  receiver: string;
}

export type UpdateAddressDTO = Partial<CreateAddressDTO> & {
  default?: boolean;
};
