import mongoose, {
  Document,
  Schema,
  SchemaTimestampsConfig,
  model,
} from "mongoose";

export interface ICategory {
  name: string;
  image: string;
}

export interface ICategoryModel
  extends ICategory,
    Document,
    SchemaTimestampsConfig {}

export const CategorySchema: Schema = new Schema(
  {
    name: { type: String, require: true },
    image: { type: String, require: true },
  },
  { timestamps: true }
);

const Category = model<ICategoryModel>("Category", CategorySchema);

export default Category;
