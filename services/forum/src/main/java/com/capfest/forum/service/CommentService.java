package com.capfest.forum.service;

import com.capfest.forum.entity.Comment;
import com.capfest.forum.repository.CommentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@Service
public class CommentService {
    @Autowired
    private CommentRepo commentRepo;

    public Comment addComment(Comment comment) {
        // Set the current date for createdAt and updatedAt
        Date currentDate = Date.from(Instant.now());

        // Create and set the properties for the Comment object
        Comment newComment = new Comment();
        newComment.setContent(comment.getContent());
        newComment.setDiscussionId(comment.getDiscussionId());
        newComment.setUserId(comment.getUserId());
        newComment.setCreatedAt(currentDate);
        newComment.setUpdatedAt(currentDate);
        newComment.setUpvotes(0);
        newComment.setDownvotes(0);
        newComment.setSentimentScore(0.0);


        // Log the comment before saving
        System.out.println("Saving comment: " + newComment);

        // Save and return the comment
        try {
            return commentRepo.save(newComment);
        } catch (Exception e) {
            // Log the error for debugging
            System.err.println("Error saving comment: " + e.getMessage());
            throw e; // Optionally re-throw or handle more gracefully based on the use case
        }
    }
    public Comment voteOnComment(String commentId, String userId, boolean isUpvote) {
        Comment comment = commentRepo.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        Integer existingVote = comment.getUserVotes().get(userId);

        if (existingVote != null) {
            if (existingVote == (isUpvote ? 1 : -1)) {
                return comment;
            } else {
                if (isUpvote) {
                    comment.setUpvotes(comment.getUpvotes() + 1);
                    comment.setDownvotes(comment.getDownvotes() - 1);
                } else {
                    comment.setUpvotes(comment.getUpvotes() - 1);
                    comment.setDownvotes(comment.getDownvotes() + 1);
                }
            }
        } else {
            if (isUpvote) {
                comment.setUpvotes(comment.getUpvotes() + 1);
            } else {
                comment.setDownvotes(comment.getDownvotes() + 1);
            }
        }

        comment.getUserVotes().put(userId, isUpvote ? 1 : -1);

        return commentRepo.save(comment);
    }
    public Comment addReply(Comment reply) {
        // Set the current date for createdAt and updatedAt
        Date currentDate = Date.from(Instant.now());

        // Create and set the properties for the reply (same as for a comment)
        Comment newReply = new Comment();
        newReply.setContent(reply.getContent());  // Content of the reply
        newReply.setDiscussionId(reply.getDiscussionId());  // Discussion ID (can be passed with reply)
        newReply.setUserId(reply.getUserId());  // User ID (can be extracted from JWT)
        newReply.setParentCommentId(reply.getParentCommentId());  // Parent comment ID (set in the controller)
        newReply.setCreatedAt(currentDate);  // Set the creation time
        newReply.setUpdatedAt(currentDate);  // Set the update time
        newReply.setUpvotes(0);  // Initialize upvotes for the reply
        newReply.setDownvotes(0);  // Initialize downvotes for the reply
        newReply.setSentimentScore(0.0);  // Optionally calculate sentiment

        // Log the reply before saving
        System.out.println("Saving reply: " + newReply);

        // Save and return the reply
        try {
            return commentRepo.save(newReply);  // Save the reply to the database
        } catch (Exception e) {
            System.err.println("Error saving reply: " + e.getMessage());
            throw e;  // Optionally re-throw or handle more gracefully
        }
    }

}

