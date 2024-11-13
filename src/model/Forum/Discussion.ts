import {Comment} from "./Comment";

export interface Discussion {
  discussionId: string;
  title: string;
  content: string;
  createdAt: Date;
  userId: string;
  visibility: VisibilityType;
  likes: number;
  comments: number;
  tags: string[];
  pinned: boolean;
  viewCount: number;
  sentimentScore: number;
  commentList: Comment[]; // Ensure this is correctly defined as an array of Comment objects
  invitedUsers: string[];
  status: DiscussionStatus;
  userHasLiked: boolean; // Add this line

}
export enum VisibilityType {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  INVITE_ONLY = 'INVITE_ONLY'
}

export enum DiscussionStatus {
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

