package com.capfest.forum.Controller;

import com.capfest.forum.entity.Comment;
import com.capfest.forum.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/api/comments")
public class CommentController {
    @Autowired
    private CommentService commentService;
    @PostMapping("/add")
    public ResponseEntity<Comment> addComment(
            @RequestBody Comment content,
            @AuthenticationPrincipal Jwt jwt) {

        if (jwt == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        String username = jwt.getClaim("given_name"); // Adjust claim name if needed
        content.setUserId(username);



        try {
            // Create and save the new comment through the service
            Comment newComment = commentService.addComment(content);
            return new ResponseEntity<>(newComment, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/upvote/{commentId}")
    public Comment upvoteComment(@PathVariable String commentId, @AuthenticationPrincipal Jwt jwt) {
        String userId = jwt.getClaim("given_name"); // Extract userId from JWT
        return commentService.voteOnComment(commentId, userId, true);  // true for upvote
    }

    // Endpoint for downvoting a comment
    @PostMapping("/downvote/{commentId}")
    public Comment downvoteComment(@PathVariable String commentId, @AuthenticationPrincipal Jwt jwt) {
        String userId = jwt.getClaim("given_name"); // Extract userId from JWT
        return commentService.voteOnComment(commentId, userId, false);  // false for downvote
    }

    @PostMapping("/reply/{parentCommentId}")
    public ResponseEntity<Comment> replyToComment(
            @PathVariable String parentCommentId,
            @RequestBody Comment reply,
            @AuthenticationPrincipal Jwt jwt) {

        String userId = jwt.getClaim("sub"); // Get the user ID from JWT
        reply.setUserId(userId);  // Set the user who is replying
        reply.setParentCommentId(parentCommentId);  // Set the parent comment ID for the reply

        // Set additional fields (e.g., discussionId, createdAt, etc.)
        reply.setCreatedAt(new Date());  // Set the created timestamp
        reply.setUpdatedAt(new Date());  // Set the updated timestamp
        reply.setUpvotes(0);  // Initialize votes to 0
        reply.setDownvotes(0);  // Initialize votes to 0
        reply.setSentimentScore(0.0);  // Optional, if you're calculating sentiment

        // Save the reply
        Comment savedReply = commentService.addReply(reply);
        return new ResponseEntity<>(savedReply, HttpStatus.CREATED);
    }
}
