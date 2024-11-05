package com.capfest.forum.entity;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "discussions")
public class Discussion {
    @Id
    private String discussionId;
    private String title;
    private String content;
    private Date createdAt;
    private String userId;
    private VisibilityType visibility;
    private int likes;
    private int comments;
    private List<String> tags;
    private boolean pinned;
    private int viewCount;
    private double sentimentScore;
    private List<Comment> commentList;
    private List<String> invitedUsers;
    private DiscussionStatus status;
    private Set<String> likedByUserIds = new HashSet<>(); // New field to track user likes


}
