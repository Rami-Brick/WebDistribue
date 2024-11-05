package com.capfest.forum.repository;

import com.capfest.forum.entity.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CommentRepo  extends MongoRepository<Comment, String> {
    List<Comment> findByDiscussionId(String discussionId);
}
