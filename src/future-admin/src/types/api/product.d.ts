declare interface IProdRes {
  _id: string
  name: string
  category: {
    _id: string
    name: string
  }
  quantity: number
  price: number
}

declare interface IProdPagination {
  products: IProdRes[]
  numOfProds: number
}

declare interface IUpdateProduct {
  _id: string
  name: string
  category: string
  price: number
  quantity: number
  description: string
  thumbnail: string
  images: string[]
}
