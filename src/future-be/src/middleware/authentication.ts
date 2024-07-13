import * as express from "express";
import * as jwt from "jsonwebtoken";
import { UsersService } from "../services";
import HttpException from "../utils/http-exception";
import { HttpStatus } from "../constances/enum";
import { AdminService } from "../services/admin.service";

export function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
) {
  const token = request.headers["authorization"]?.split(" ")[1] || "";

  return new Promise((resolve, reject) => {
    if (!token) {
      reject(new HttpException(HttpStatus.UNAUTHORIZED, "No token provided"));
    }
    // @typescript-eslint/no-explicit-any
    jwt.verify(
      token,
      process.env.JWT_SECRET || "",
      async function (err: any, decoded: any) {
        if (err) {
          return reject(
            new HttpException(HttpStatus.UNAUTHORIZED, err.message)
          );
        }

        // Check if JWT contains all required scopes
        if (scopes && scopes.length > 0) {
          // @typescript-eslint/no-explicit-any
          if (!scopes.includes(decoded.role[0])) {
            return reject(
              new HttpException(
                HttpStatus.FOBIDDEN,
                "JWT does not contain required role."
              )
            );
          } else if (decoded.role[0] === "user") {
            const user = await UsersService.findUserById(decoded.userId);
            if (!user) {
              return reject(
                new HttpException(HttpStatus.NOT_FOUND, "User not exist")
              );
            }
          } else if (decoded.role[0] === "admin") {
            try {
              await AdminService.findAdminById(decoded.userId);
            } catch (error) {
              return reject(
                new HttpException(HttpStatus.NOT_FOUND, "User not exist")
              );
            }
            // if (!admin) {
            // }
          }
          resolve(decoded);
        }
      }
    );
  });
}
