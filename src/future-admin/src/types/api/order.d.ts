declare interface IAllOrders {
  shortId: string
  address: string
  userName: string
  total: number
  dateCreated: string
  status: string
}

declare interface IOrderRes {
  allOrders: IAllOrders[]
  numOfProds: number
}

declare interface IProdPagination {
  products: IProdRes[]
  numOfProds: number
}
declare interface IOrderItemsInfo {
  product: string
  price: number
  quantity: number
}
declare interface IRevenueValue {
  value: number
  label: string
}
