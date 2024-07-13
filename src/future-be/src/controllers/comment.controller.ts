import {
  Body,
  Controller,
  Delete,
  Path,
  Post,
  Request,
  Route,
  Security,
  Tags,
} from "tsoa";
import { CreateCommentDTO } from "../dto/request";
import { IGetUserAuthInfoRequest } from "../types/express";
import { CommentService } from "../services/comment.service";

@Tags("Comments")
@Route("comments")
export class CommentsController extends Controller {
  @Security("jwt", ["user"])
  @Post()
  public async createComment(
    @Body() dto: CreateCommentDTO,
    @Request() request: IGetUserAuthInfoRequest
  ) {
    return CommentService.createComment(dto, request.user.userId);
  }

  @Security("jwt", ["user"])
  @Delete("{productId}/{commentId}")
  public async deleteComment(
    @Path() productId: string,
    @Path() commentId: string,
    @Request() request: IGetUserAuthInfoRequest
  ) {
    return CommentService.delete(productId, commentId, request.user.userId);
  }
}
