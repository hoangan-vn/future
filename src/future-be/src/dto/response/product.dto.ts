import { CommentResDTO } from "./comment.dto";

export class ProdutResDTO {
  _id: string;
  name: string;
  category: {
    _id: string;
    name: string;
  };
  price: number;
  quantity: number;
}

export class ProductUpdateRes {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description: string;
  thumbnail: string;
  images: string[];
}

export class ProductCard {
  _id: string;
  name: string;
  price: number;
  category: {
    _id: string;
    name: string;
  };
  thumbnail: string;
}

export class ProductDetail {
  _id: string;
  name: string;
  price: number;
  category: {
    _id: string;
    name: string;
  };
  thumbnail: string;
  images: string[];
  quantity: number;
  rating: number;
  description: string;
  comments: CommentResDTO[];
}
