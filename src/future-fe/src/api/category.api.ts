import axiosService from "./axios-service";

const API = process.env.REACT_APP_API_URL;

const ENDPOINT = "categories";
const URL = `${API}/${ENDPOINT}`;

export const categoryApi = {
  get: async () => {
    const response = await axiosService.get<IResponseSuccess<ICategory[]>>(
      `${URL}`
    );

    return response.data.data;
  },
};
