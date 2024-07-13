import passport from "passport";
import PassportGoogle, { Profile } from "passport-google-oauth20";
import User, { IUser } from "../models/user";
passport.use(
  new PassportGoogle.Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "http://localhost:5500/api/v1/authenticate/google/callback",
    },
    function (accessToken, refreshToken, profile: Profile, done) {
      // câu lệnh bên dưới chỉ sử dụng nếu dùng DB
      // flow code trên: khi ng dùng login gmail success thì nó sẽ check trong DB người dùng đã từng đăng nhập google hay chưa? (check cái profile.id của google)
      // nếu chưa có thì tạo mới còn có rồi thì thực hiện hàm callback cb bên dưới.
      //   User.findOne(
      //     { googleId: profile.id },
      //     (err: string | Error, user: Express.User | undefined) => {
      //       if (err) {
      //         return done(err);
      //       }
      //       if (user) {
      //         return done(null, user);
      //       } else {
      //         const newUser: IUser = new User({
      //           googleId: profile.id,
      //           name: profile.name,
      //           username: profile.username,
      //           password:"",
      //           email: profile.emails
      //         });
      //       }
      //     }
      //   );
      done(null, profile);

      // ở đây mình ko sử dụng DB nên mình sẽ return  về profile của nó lun
      // profile có thể gồm username, userid, profile pictures,...(user information)
      //   // ngoài ra chúng ta có thể sử dụng khai báo ra user nếu chúg ta sử dụng DB
      //   const user = {
      //     username: profile.displayName,
      //     // chọn first photos
      //     avatar: profile.photos[0],
      //   };
      //   // tiếp đến chúng ta có thể save nó vào DB dùng user.save()
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user: any, done: any) => {
  done(null, user);
});
