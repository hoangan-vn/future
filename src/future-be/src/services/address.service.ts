import mongoose from "mongoose";
import {
  CREATE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_SUCCESS,
  ERROR_ADDRESS_NOT_FOUND,
  ERROR_CHANGE_DEFAULT_ADDRESS,
  ERROR_CREATE_ADDRESS,
  ERROR_DELETE_ADDRESS,
  ERROR_UPDATE_ADDRESS,
  UPDATE_ADDRESS_SUCCESS,
} from "../constances/address-res-message";
import { HttpStatus } from "../constances/enum";
import { CreateAddressDTO, UpdateAddressDTO } from "../dto/request";
import { AddressRes } from "../dto/response/address.dto";
import Address from "../models/address";
import { handleResFailure, handlerResSuccess } from "../utils/handle-response";
import User from "../models/user";

export class AddressService {
  static async create(dto: CreateAddressDTO, userId: string) {
    try {
      const user = await User.findById(userId);

      const newAddress = await Address.create({
        ...dto,
        default: user?.addresses.length === 0 ? true : false,
      });

      const response: AddressRes = {
        _id: newAddress._id,
        default: newAddress.default,
        district: newAddress.district,
        phone: newAddress.phone,
        province: newAddress.province,
        receiver: newAddress.receiver,
        specificAddress: newAddress.specificAddress,
        ward: newAddress.ward,
      };

      await User.findOneAndUpdate(
        { _id: userId },
        {
          $push: { addresses: newAddress._id },
        }
      );

      return handlerResSuccess(CREATE_ADDRESS_SUCCESS, response);
    } catch (error) {
      return handleResFailure(ERROR_CREATE_ADDRESS, HttpStatus.BAD_REQUEST);
    }
  }

  static async update(id: string, dto: UpdateAddressDTO, userId: string) {
    try {
      const address = await Address.findById(id);
      if (!address) {
        return handleResFailure(ERROR_ADDRESS_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      if (address.default === true && dto.default === false) {
        return handleResFailure(
          ERROR_CHANGE_DEFAULT_ADDRESS,
          HttpStatus.NOT_ACCEPTABLE
        );
      }

      if (dto.default === true && address.default === false) {
        const addressesId = (await User.findById(userId))
          ?.addresses as string[];
        console.log("addressesId: ", addressesId);

        await Address.updateMany(
          { _id: { $in: addressesId } },
          { $set: { default: false } }
        );
      }

      if (dto.district) {
        address.district = dto.district;
      }
      if (dto.phone) {
        address.phone = dto.phone;
      }
      if (dto.province) {
        address.province = dto.province;
      }
      if (dto.receiver) {
        address.receiver = dto.receiver;
      }
      if (dto.specificAddress) {
        address.specificAddress = dto.specificAddress;
      }
      if (dto.ward) {
        address.ward = dto.ward;
      }
      if (dto.default === true || dto.default === false) {
        address.default = dto.default;
      }

      await address.save();

      const result: AddressRes = {
        _id: address._id,
        default: address.default,
        district: address.district,
        phone: address.phone,
        province: address.province,
        receiver: address.receiver,
        specificAddress: address.specificAddress,
        ward: address.ward,
      };

      return handlerResSuccess(UPDATE_ADDRESS_SUCCESS, result);
    } catch (error: any) {
      return handleResFailure(
        error.error || ERROR_UPDATE_ADDRESS,
        error.statuscode || HttpStatus.BAD_REQUEST
      );
    }
  }

  static async delete(id: string, userId: string) {
    try {
      const address = await Address.findById(id);
      if (!address) {
        return handleResFailure(ERROR_ADDRESS_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      address.deleted = true;
      await address.save();

      await User.updateOne({ _id: userId }, { $pull: { addresses: id } });

      return handlerResSuccess(DELETE_ADDRESS_SUCCESS, id);
    } catch (error: any) {
      return handleResFailure(
        error.error || ERROR_DELETE_ADDRESS,
        error.statusCode || HttpStatus.BAD_REQUEST
      );
    }
  }

  static async getMany(ids: string[]) {
    const addresses = await Address.find({ _id: { $in: ids } });

    const result: AddressRes[] = [];

    for (const item of addresses) {
      result.push({
        _id: item._id,
        default: item.default,
        district: item.district,
        phone: item.phone,
        province: item.province,
        receiver: item.receiver,
        specificAddress: item.specificAddress,
        ward: item.ward,
      });
    }

    return result;
  }
}
