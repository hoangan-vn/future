import {
  Body,
  Controller,
  Example,
  Get,
  Post,
  Response,
  Request,
  Route,
  Tags,
} from "tsoa";
import { AuthenticationService } from "../services/authentication.service";
import { ICreateUser, IEmailVerify } from "../dto/request";
import { UsersService } from "../services";
import passport from "passport";
import { nextTick } from "process";
// import { UsersService } from "../services";
// import { Response as ExResponse, response } from "express";

@Tags("login")
@Route("authenticate")
export class AuthenticationController extends Controller {
  @Post("/login")
  public async loginUser(
    @Body() dto: Pick<ICreateUser, "username" | "password">
  ) {
    return AuthenticationService.login(dto);
  }
  @Post("/send-code-email")
  public async sendVerifyCode(@Body() dto: IEmailVerify) {
    return AuthenticationService.sendVerifyCode(dto);
  }
  @Post("/register")
  public async createUser(@Body() dto: ICreateUser) {
    return UsersService.create(dto);
  }
  @Get("google")
  public createGoogleClientRequest() {
    passport.authenticate("google", { scope: ["profile", "email"] });
  }
  @Get("google/callback")
  public callBackGoogle() {
    passport.authenticate("google", {
      successRedirect: process.env.CLIENT_URL,
      failureRedirect: "/login/failed",
    });
  }
  // @Get("/github")
  // public async createGithubClientRequest(passport: Authenticator) {
  //   passport.authenticate("github", { scope: ["profile"] });
  // }
  // @Get("/github/callback")
  // public async callBackGithub(passport: Authenticator) {
  //   passport.authenticate("github", {
  //     successRedirect: process.env.CLIENT_URL,
  //     failureRedirect: "/login/failed",
  //   });
  // }
  // @Get("/login/success")
  // public loginSuccess(Request() req: any, @Response() res: any): Promise<any>{
  //   console.log(req.user);
  //   if (req.user) {
  //     res.status(200).json({
  //       success: true,
  //       message: "successful",
  //       // hoặc nếu các bạn mún send JWT, bạn có thể viết ở đây.
  //       // bất kể thông tin gì bạn cần gửi cho user, ở đây mình chỉ gửi cho nó thông tin của user.(user: req.user)
  //       user: req.user,
  //       //   cookies: req.cookies,
  //     });
  //   }
  //   return Promise.resolve();
  // }
  // @Get("/login/failed")
  // public async loginFailed(@Response(401) res: any) {
  //   res(401, {
  //     success: false,
  //     message: "failure",
  //   });
  //   return Promise.resolve();
  // }
  // @Get("/logout")
  // public async logout(@Request() req: any, @Response() res: any) {
  //   req.logout(function (err: any) {
  //     if (err) {
  //       return nextTick(err);
  //     }
  //     res.redirect(process.env.CLIENT_URL as string);
  //   });
  // }
}
