import axiosService from "./axios-service";

const API = process.env.REACT_APP_API_URL;

const ENDPOINT = "users";
const URL = `${API}/${ENDPOINT}`;

export const userApi = {
  getUserInfo: async () => {
    const response = await axiosService.get<IResponseSuccess<UpdateUser>>(
      `${URL}`
    );

    return response.data.data;
  },
  updateUserInfo: async (body: FormData) => {
    const response = await axiosService.put<IResponseSuccess<UpdateUser>>(
      `${URL}/setting`,
      body
    );

    return response.data.data;
  },
  getAddresses: async () => {
    const response = await axiosService.get<IResponseSuccess<IAddress[]>>(
      `${URL}/addresses`
    );

    return response.data.data;
  },
  getWishlist: async () => {
    const response = await axiosService.get<
      IResponseSuccess<FavoriteProduct[]>
    >(`${URL}/wishlist`);

    return response.data.data;
  },
  deleteWishlistItem: async (productId: string) => {
    const response = await axiosService.delete<IResponseSuccess<string>>(
      `${URL}/wishlist/${productId}`
    );

    return response.data.data;
  },
  insertWishlistItem: async (productId: string) => {
    const response = await axiosService.post<IResponseSuccess<FavoriteProduct>>(
      `${URL}/wishlist/${productId}`
    );

    return response.data.data;
  },

  getItemCart: async () => {
    const response = await axiosService.get<IResponseSuccess<CartItem[]>>(
      `${URL}/cart`
    );

    return response.data.data;
  },

  addToCart: async (body: AddToCart) => {
    const response = await axiosService.post<IResponseSuccess<CartItem>>(
      `${URL}/cart`,
      body
    );
    return response.data.data;
  },

  updateQuantity: async (body: UpdateQuantity) => {
    const response = await axiosService.put<IResponseSuccess<UpdateQuantity>>(
      `${URL}/cart/${body.productId}`,
      {
        action: body.action,
      }
    );
    return response.data.data;
  },

  deleteCart: async (productId: string) => {
    const response = await axiosService.delete<IResponseSuccess<string>>(
      `${URL}/cart/${productId}`
    );
    return response.data.data;
  },

  deleteAllCart: async () => {
    const response = await axiosService.delete<IResponseSuccess<string>>(
      `${URL}/cart`
    );

    return response.data.data;
  },
};
