import { CreateAddressDTO } from "../request";

export class AddressRes extends CreateAddressDTO {
  _id: string;
  default: boolean;
}
