import axiosService from './axios-service'

const API = process.env.API_URL

const ENDPOINT = 'users'
const URL = `${API}/${ENDPOINT}`

export const userApi = {
  countUsers: async () => {
    const resposne = await axiosService.get<IResponseSuccess<number>>(`${URL}/count-user`)

    return resposne.data.data
  }
}
