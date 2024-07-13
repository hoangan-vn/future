import axiosService from "./axios-service";

const API = process.env.REACT_APP_API_URL;

const ENDPOINT = "addresses";
const URL = `${API}/${ENDPOINT}`;

export const addressApi = {
  create: async (body: CreateAddress) => {
    const response = await axiosService.post<IResponseSuccess<IAddress>>(
      `${URL}`,
      body
    );

    return response.data.data;
  },
  update: async (body: UpdateAddress) => {
    const response = await axiosService.put<IResponseSuccess<IAddress>>(
      `${URL}/${body._id}`,
      {
        default: body.default,
        district: body.district,
        phone: body.phone,
        province: body.province,
        receiver: body.receiver,
        specificAddress: body.specificAddress,
        ward: body.ward,
      }
    );

    return response.data.data;
  },
  delete: async (id: string) => {
    const response = await axiosService.delete<IResponseSuccess<string>>(
      `${URL}/${id}`
    );

    return response.data.data;
  },
};
