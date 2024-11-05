package com.capfest.forum.repository;

import com.capfest.forum.entity.Discussion;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface DiscussionRepo extends MongoRepository<Discussion, String> {
    List<Discussion> findByUserId(String userId);

}
