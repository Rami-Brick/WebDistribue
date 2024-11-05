package com.capfest.forum.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Comments")
public class Comment {
    @Id
    private String commentId;
    private String content;
    private Date createdAt;
    private Date updatedAt;
    private String userId;
    private String discussionId;
    private double sentimentScore;
    private int downvotes;
    private int upvotes;
    private String parentCommentId;
    private Map<String, Integer> userVotes = new HashMap<>();


}
