declare interface IProductInfo {
  _id: string;
  name: string;
  star: number;
  images: string[];
  comments: IComment[];
  description: string;
  price: number;
}

declare type FavoriteProduct = Pick<IProductInfo, "_id" | "name" | "price"> & {
  thumbnail: string;
  isStock: boolean;
};

declare interface IProductDetail {
  _id: string;
  name: string;
  rating: number;
  images: string[];
  description: string;
  price: number;
  catogory: {
    _id: string;
    name: string;
  };
  comments: IComment[];
  quantity: number;
  thumbnail: string;
}

declare interface IComment {
  _id: string;
  content: string;
  rate: number;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
  createAt: string;
}

declare interface IProductCard {
  _id: string;
  name: string;
  price: number;
  category: {
    _id: string;
    name: string;
  };
  thumbnail: string;
}

declare type SearchProduct = {
  categry?: string;
  limit: number;
  page: number;
  search?: string;
  from?: number;
  to?: number;
  sort?: "ascending" | "descending";
};
