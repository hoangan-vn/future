export class CommentResDTO {
  _id: string;
  content: string;
  rate: number;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
  createdAt: string;
}
