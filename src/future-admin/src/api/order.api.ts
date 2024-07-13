import axiosService from './axios-service'

const API = process.env.API_URL

const ENDPOINT = 'orders'
const URL = `${API}/${ENDPOINT}`

const orderApi = {
  getOrderRevenue: async (timeReport: string) => {
    const response = await axiosService.get<IResponseSuccess<IRevenueValue[]>>(
      `${URL}/revenue?timeReport=${timeReport}`
    )

    return response
  }
}
export default orderApi
