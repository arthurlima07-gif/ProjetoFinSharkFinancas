export type CommentGet = {
  id: number;
  title: string;
  content: string;
  createdOn: string;
  createdBy: string;
  stockId: number;
};

export type CommentPost = {
  title: string;
  content: string;
};