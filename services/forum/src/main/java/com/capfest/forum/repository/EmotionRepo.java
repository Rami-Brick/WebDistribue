package com.capfest.forum.repository;

import com.capfest.forum.entity.EmotionAnalysis;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EmotionRepo  extends MongoRepository<EmotionAnalysis, String> {
}
