export interface Comment {
  commentId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  discussionId: string;
  sentimentScore: number;
  downvotes: number;
  upvotes: number;
  parentCommentId?: string;
}
