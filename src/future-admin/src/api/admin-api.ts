import { setCookie } from 'cookies-next'
import axiosService from './axios-service'

const API = process.env.API_URL

const ENDPOINT = 'admin'
const URL = `${API}/${ENDPOINT}`

const adminApi = {
  get: async () => {
    const response = await axiosService.get<IResponseSuccess<ResAdmin>>(URL)
    return response.data.data
  },

  login: async (data: AdminLogin) => {
    const response = await axiosService.post<IResponseSuccess<string>>(URL + '/login', data)
    setCookie('Authorization', response.data.data)

    return response.data.data
  },

  update: async (data: UpdateAdmin) => {
    const response = await axiosService.put<IResponseSuccess<ResAdmin>>(URL + '/setting', data)

    return response.data.data
  },

  validate: async () => {
    const response = await axiosService.get<IResponseSuccess<boolean>>(URL + '/validate')

    return response.data.data
  }
}

export default adminApi
