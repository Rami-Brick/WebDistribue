import { Component } from '@angular/core';
import {Discussion} from "../../../../model/Forum/Discussion";
import {DiscussionService} from "../../../service/discussion.service";
import {ActivatedRoute} from "@angular/router";
import {routes} from "../../../core/helpers/routes/routes";
import {CommentService} from "../../../service/comment.service";
import { Comment } from '../../../../model/Forum/Comment';

@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.scss']
})
export class CommentaireComponent {
  discussion: Discussion | null = null;
  newCommentContent = ''; // Type is inferred automatically

  error: string | null = null;
  public routes = routes;

  constructor(
    private route: ActivatedRoute,
    private discussionService: DiscussionService,
    private commentService: CommentService
  ) {
  }

  ngOnInit(): void {
    const discussionId = this.route.snapshot.paramMap.get('id');
    if (discussionId) {
      this.fetchDiscussionWithComments(discussionId);
    }
  }

  fetchDiscussionWithComments(discussionId: string): void {
    this.discussionService.getDiscussionWithComments(discussionId).subscribe(
      (data) => {
        console.log('Fetched discussion with comments:', data); // Log to verify structure
        if (data && Array.isArray(data.commentList)) {
          // Optionally filter out any null or invalid comments
          data.commentList = data.commentList.filter(comment => comment !== null);
          this.discussion = data;
        } else {
          console.warn('Invalid discussion data received');
          this.error = 'Discussion data is not properly formatted.';
          this.discussion = null; // Reset or handle accordingly
        }
      },
      (error) => {
        console.error('Error fetching discussion with comments:', error);
        this.error = 'Failed to load discussion and comments.';
      }
    );
  }


  addComment(): void {
    if (this.discussion && this.newCommentContent.trim()) {
      this.commentService.addComment(this.discussion.discussionId, this.newCommentContent).subscribe(
        (newComment) => {
          console.log('Comment added:', newComment);

          // Ensure commentList exists and push the new comment


          // Clear the input field after submission
          this.newCommentContent = '';
        },
        (error) => {
          console.error('Error adding comment:', error);
          this.error = 'Failed to add comment.';
        }
      );
    } else {
      this.error = 'Please enter a comment before submitting.';
    }
  }
  upvoteComment(commentId: string): void {
    this.commentService.upvoteComment(commentId).subscribe(
      (updatedComment: any) => {  // Still using `any`, but with type guard
        if (updatedComment) {
          console.log('Updated comment after upvote:', updatedComment);

          // Find the comment in the discussion's commentList and update its vote count
          const comment = this.discussion?.commentList.find(c => c.commentId === updatedComment.commentId);
          if (comment) {
            comment.upvotes = updatedComment.upvotes;   // Update upvotes
            comment.downvotes = updatedComment.downvotes; // Update downvotes
          }
        } else {
          console.error('Invalid comment structure:', updatedComment);
        }
      },
      (error) => console.error('Error upvoting comment:', error)
    );
  }

  downvoteComment(commentId: string): void {
    this.commentService.downvoteComment(commentId).subscribe(
      (updatedComment: any) => {  // Still using `any`, but with type guard
        if (updatedComment) {
          console.log('Updated comment after downvote:', updatedComment);

          // Find the comment in the discussion's commentList and update its vote count
          const comment = this.discussion?.commentList.find(c => c.commentId === updatedComment.commentId);
          if (comment) {
            comment.upvotes = updatedComment.upvotes;   // Update upvotes
            comment.downvotes = updatedComment.downvotes; // Update downvotes
          }
        } else {
          console.error('Invalid comment structure:', updatedComment);
        }
      },
      (error) => console.error('Error downvoting comment:', error)
    );
  }

}
