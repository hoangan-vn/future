declare interface UserInfoLogin {
  name: string;
  email: string;
  username: string;
  password: string;
  avatar: string;
}

declare interface IUser {
  name: string;
  email: string;
  password: string;
  avatar: string;
  birthday: string | Date;
  address: IAddress[];
}

type UpdateUser = Omit<IUser, "password", "address">;

type AuthenticateLogin = Pick<UserInfoLogin, "username" | "password">;

type EmailVerify = Pick<UserInfoLogin, "email">;

declare interface CartItem {
  _id: string;
  thumbnail: string;
  name: string;
  price: number;
  quantity: number;
}

declare interface AddToCart {
  productId: string;
  quantity: number;
}

declare interface UpdateQuantity {
  productId: string;
  action: string;
}
