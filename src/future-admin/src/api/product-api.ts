import axiosService from './axios-service'

const API = process.env.API_URL

const ENDPOINT = 'products'
const URL = `${API}/${ENDPOINT}`

const productAPI = {
  createProduct: async (body: FormData) => {
    const response = await axiosService.post<IResponseSuccess<string>>(URL, body)

    return response.data.data
  },

  getPagination: async (limit: number, page: number) => {
    const response = await axiosService.get<IResponseSuccess<IProdPagination>>(
      `${URL}/pagination?limit=${limit}&page=${page}`
    )

    return response.data.data
  },

  deleteProduct: async (prodId: string) => {
    const response = await axiosService.delete<IResponseSuccess<string>>(`${URL}/${prodId}`)

    return response.data.data
  },

  getProductUpdate: async (productId: string) => {
    const response = await axiosService.get<IResponseSuccess<IUpdateProduct>>(`${URL}/update/${productId}`)
    
    return response.data.data
  },

  updateProduct: async (body: FormData, productId: string) => {
    const response = await axiosService.put<IResponseSuccess<string>>(`${URL}/${productId}`, body)

    return response.data.data
  },

  countProduct: async () => {
    const response = await axiosService.get<IResponseSuccess<number>>(`${URL}/count-products`)

    return response.data.data
  }
}

export default productAPI
