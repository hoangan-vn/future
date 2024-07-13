import axiosService from './axios-service'

const API = process.env.API_URL

const ENDPOINT = 'categories'
const URL = `${API}/${ENDPOINT}`

const categoryApi = {
  getCategories: async () => {
    const response = await axiosService.get<IResponseSuccess<ICategory[]>>(URL)

    return response.data.data
  },

  create: async (body: FormData) => {
    const response = await axiosService.post<IResponseSuccess<ICategory>>(URL, body)

    return response.data.data
  },

  update: async (data: IUpdateCategory) => {
    const response = await axiosService.put<IResponseSuccess<ICategory>>(`${URL}/${data._id}`, data.body)

    return response.data.data
  },

  delete: async (id: string) => {
    const response = await axiosService.delete<IResponseSuccess<string>>(`${URL}/${id}`)

    return response.data.data
  }
}

export default categoryApi
