import {
  Body,
  Controller,
  Delete,
  Path,
  Post,
  Request,
  Put,
  Route,
  Security,
  Tags,
  Response,
} from "tsoa";
import { CreateAddressDTO, UpdateAddressDTO } from "../dto/request";
import { AddressService } from "../services/address.service";
import { IGetUserAuthInfoRequest } from "../types/express";

@Tags("Addresses")
@Route("addresses")
export class AddressController extends Controller {
  @Security("jwt", ["user"])
  @Post()
  public async createAddress(
    @Body() dto: CreateAddressDTO,
    @Request() request: IGetUserAuthInfoRequest
  ) {
    return AddressService.create(dto, request.user.userId);
  }

  @Security("jwt", ["user"])
  @Put("/{id}")
  public async updateAddress(
    @Path() id: string,
    @Body() dto: UpdateAddressDTO,
    @Request() request: IGetUserAuthInfoRequest
  ) {
    return AddressService.update(id, dto, request.user.userId);
  }

  @Security("jwt", ["user"])
  @Delete("/{id}")
  public async deleteAddress(
    @Path() id: string,
    @Request() request: IGetUserAuthInfoRequest
  ) {
    return AddressService.delete(id, request.user.userId);
  }
}
