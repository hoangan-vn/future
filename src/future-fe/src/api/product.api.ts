import axiosService from "./axios-service";

const API = process.env.REACT_APP_API_URL;

const ENDPOINT = "products";
const URL = `${API}/${ENDPOINT}`;

export const productApi = {
  getProductDetail: async (id: string) => {
    const response = await axiosService.get<IResponseSuccess<IProductDetail>>(
      `${URL}/${id}`
    );
    return response.data.data;
  },

  getNewestProds: async () => {
    const response = await axiosService.get<IResponseSuccess<IProductCard[]>>(
      `${URL}/newest`
    );

    return response.data.data;
  },

  getMaxPrice: async (categoryId?: string) => {
    const response = await axiosService.get<IResponseSuccess<number>>(
      categoryId
        ? `${URL}/max-price?category=${categoryId}`
        : `${URL}/max-price`
    );

    return response.data.data;
  },

  searchAndFilterProducts: async (data: SearchProduct) => {
    let url = `${URL}/filter?limit=${data.limit}&page=${data.page}`;

    if (data.categry) {
      url += `&category=${data.categry}`;
    }
    if (data.search) {
      url += `&search=${data.search}`;
    }
    if (data.to) {
      url += `&from=${data.from}&to=${data.to}`;
    }
    if (data.sort) {
      url += `&sort=${data.sort}`;
    }

    const response = await axiosService.get<IResponseSuccess<IProductCard[]>>(
      url
    );

    return response.data.data;
  },
};
