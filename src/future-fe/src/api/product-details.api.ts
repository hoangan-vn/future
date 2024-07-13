import axiosService from "./axios-service";

const API = process.env.REACT_APP_API_URL;

const ENDPOINT = "products";
const URL = `${API}/${ENDPOINT}`;

export const productDetailsApi = {
  getProductById: async (productId: string) => {
    const product = await axiosService.get<IResponseSuccess<IProductInfo>>(
      `${URL}/${productId}`
    );

    return product.data.data;
  },
};
