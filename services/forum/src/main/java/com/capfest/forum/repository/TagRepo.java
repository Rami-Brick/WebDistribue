package com.capfest.forum.repository;

import com.capfest.forum.entity.Tag;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TagRepo extends MongoRepository<Tag, String>{
    Optional<Tag> findByName(String name);


    @Query("{ 'name' : { $regex: ?0, $options: 'i' } }")
    List<Tag> findByNameRegex(String regex);

}
