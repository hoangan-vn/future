/* eslint-disable @typescript-eslint/no-explicit-any */
// src/users/usersService.ts

import {
  CREATE_USER_SUCCESS,
  ERROR_CREATE_USER,
  ERROR_GET_USER_BY_ID,
  ERROR_PASSWORD_NOT_MATCH,
  ERROR_UPDATE_USER,
  ERROR_USER_NOT_FOUND,
  FIND_USER_BY_ID_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  UPDATE_USER_SUCESS,
} from "../constances";
import { HttpStatus } from "../constances/enum";
import {
  AdminLogin,
  ICreateAdmin,
  IUpdateAdmin,
  ResAdmin,
} from "../dto/request";
import { AdminResDTO } from "../dto/response";
import Admin from "../models/admin";
import { handleResFailure, handlerResSuccess } from "../utils/handle-response";
import { comparePassword, hashPasswords } from "../utils/hash-password";
import * as jwt from "jsonwebtoken";

export class AdminService {
  static async create(adminCreationParams: ICreateAdmin) {
    try {
      const admin = new Admin({
        name: adminCreationParams.name,
        username: adminCreationParams.username,
        password: hashPasswords(adminCreationParams.password),
      });

      await admin.save();

      const adminRes: AdminResDTO = {
        _id: admin._id.toString(),
        name: admin.name,
      };

      return handlerResSuccess<AdminResDTO>(CREATE_USER_SUCCESS, adminRes);
    } catch (error) {
      return handleResFailure(ERROR_CREATE_USER, HttpStatus.BAD_REQUEST);
    }
  }

  static async login(dto: AdminLogin) {
    try {
      const admin = await Admin.findOne({ username: dto.username });

      if (!admin) {
        return handleResFailure(ERROR_USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      const check = await comparePassword(dto.password, admin.password);

      if (!check) {
        return handleResFailure(
          ERROR_PASSWORD_NOT_MATCH,
          HttpStatus.NOT_ACCEPTABLE
        );
      }

      return handlerResSuccess(
        LOGIN_SUCCESS,
        jwt.sign(
          { userId: admin.id, role: ["admin"] },
          process.env.JWT_SECRET || ""
        )
      );
    } catch (error: any) {
      return handleResFailure(
        error.error || LOGIN_FAIL,
        error.statusCode || HttpStatus.BAD_REQUEST
      );
    }
  }

  static async update(dto: IUpdateAdmin, userId: string) {
    try {
      const admin = await Admin.findOne({ _id: userId });

      if (!admin) {
        return handleResFailure(ERROR_USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
      if (await comparePassword(dto.oldPassword, admin.password)) {
        if (dto.name) {
          admin.name = dto.name;
        }
        if (dto.password) {
          admin.password = hashPasswords(dto.password);
        }
        await admin.save();
      } else
        return handleResFailure(
          ERROR_PASSWORD_NOT_MATCH,
          HttpStatus.NOT_ACCEPTABLE
        );
      return handlerResSuccess(UPDATE_USER_SUCESS, {
        name: admin.name,
        username: admin.username,
      } as ResAdmin);
    } catch (error: any) {
      return handleResFailure(
        error.error || ERROR_UPDATE_USER,
        error.statusCode || HttpStatus.BAD_REQUEST
      );
    }
  }

  static async findAdminById(adminId: string) {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return handleResFailure(ERROR_GET_USER_BY_ID, HttpStatus.NOT_FOUND);
    }

    const res: ResAdmin = {
      name: admin?.name,
      username: admin?.username,
    };

    return handlerResSuccess(FIND_USER_BY_ID_SUCCESS, res);
  }
}
