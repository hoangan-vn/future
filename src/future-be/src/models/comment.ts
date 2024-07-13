import { Document, Schema, SchemaTimestampsConfig, model } from "mongoose";
import { IUserModel } from "./user";

export interface IComment {
  content: string;
  rate: number;
  user: string | IUserModel;
}

export interface ICommentModel
  extends IComment,
    Document,
    SchemaTimestampsConfig {}

export const CommentSchema: Schema = new Schema(
  {
    content: { type: String, require: true },
    rate: { type: Number, require: true },
    user: { type: Schema.Types.ObjectId, require: true, ref: "User" },
  },
  { timestamps: true }
);

const Comment = model<ICommentModel>("Comment", CommentSchema);

export default Comment;
