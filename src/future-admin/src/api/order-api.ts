import axiosService from './axios-service'

const API = '/api/v1'

const ENDPOINT = 'orders'
const URL = `${API}/${ENDPOINT}`

const orderAPI = {
  getAllInvoices: async (limit: number, page: number) => {
    const response = await axiosService.get<IResponseSuccess<IOrderRes>>(
      `${URL}/pagination?limit=${limit}&page=${page}`
    )

    return response.data.data
  },

  updateStatusInvoice: async (orderId: string, status: string) => {
    const response = await axiosService.put<IResponseSuccess<string>>(
      `${URL}/update-status?order-id=${orderId}&status=${status}`
    )

    return response.data.data
  },

  getInvoiceFollowDate: async (limit: number, page: number) => {
    const response = await axiosService.get<IResponseSuccess<IOrderRes>>(
      `${URL}/order-follow-date/pagination?limit=${limit}&page=${page}`
    )

    return response.data.data
  },

  getOrderItemsInfo: async (orderId: string) => {
    const response = await axiosService.get<IResponseSuccess<IOrderItemsInfo[]>>(
      `${URL}/order-by-id?order-id=${orderId}`
    )

    return response.data.data
  },

  getRevenueOfCurrentYear: async () => {
    const response = await axiosService.get<IResponseSuccess<number>>(`${URL}/revenue-current-year`)

    return response.data.data
  }
}
export default orderAPI
