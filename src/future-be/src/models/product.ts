import mongoose, {
  Document,
  Model,
  Schema,
  SchemaTimestampsConfig,
  model,
} from "mongoose";
import { ICommentModel } from "./comment";
import { ICategoryModel } from "./category";

export interface IProduct {
  name: string;
  category: string | ICategoryModel;
  price: number;
  thumbnail: string;
  images: string[];
  description: string;
  comments: string[] | ICommentModel[];
  rating: number;
  quantity: number;
}

export interface IProductModel
  extends IProduct,
    Document,
    SchemaTimestampsConfig {}

export const ProductSchema: Schema = new Schema(
  {
    name: { type: String, require: true },
    category: { type: Schema.Types.ObjectId, require: true, ref: "Category" },
    price: { type: Number, require: true },
    thumbnail: { type: String, require: true },
    images: [{ type: String, require: true }],
    description: { type: String },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    rating: { type: Number },
    quantity: { type: Number },
  },
  { timestamps: true }
);

const Product = model<IProductModel>("Product", ProductSchema);

export default Product;
