declare interface ICategory {
  _id: string
  name: string
  image: string
}

declare interface IUpdateCategory {
  _id: string
  body: FormData
}
