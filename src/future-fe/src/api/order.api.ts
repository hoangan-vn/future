import axiosService from "./axios-service";

const API = process.env.REACT_APP_API_URL;

const ENDPOINT = "orders";
const URL = `${API}/${ENDPOINT}`;

export const orderApi = {
  getOrderHistoryFollowStatus: async (status: string) => {
    const response = await axiosService.get<IResponseSuccess<IOrderHistory[]>>(
      `${URL}/history?status=${status}`
    );

    return response.data.data;
  },

  createOrder: async (body: ICreateOrder) => {
    const response = await axiosService.post<IResponseSuccess<string>>(
      `${URL}`,
      body
    );

    return response.data.data;
  },

  createZaloPayPaymentURL: async (body: ICreateZaloPayOrder) => {
    const response = await axiosService.post<IResponseSuccess<string>>(
      `${URL}/pay-with-zalopay`,
      body
    );

    return response.data.data;
  },

  queryZaloPayOrderStatus: async (app_trans_id: string) => {
    const response = await axiosService.post<
      IResponseSuccess<IQueryOrderZaloPayStatusRes>
    >(`${URL}/query-zalopay-order-status`, { app_trans_id });

    return response.data.data;
  },
};
