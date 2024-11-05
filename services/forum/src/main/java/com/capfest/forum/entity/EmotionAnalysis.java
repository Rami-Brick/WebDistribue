package com.capfest.forum.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "emotion_analysis")
public class EmotionAnalysis {
    @Id
    private String analysisId;
    private String contentId;
    private ContentType contentType;
    private String content;
    private double sentimentScore;
    private boolean isNegativeEmotion;
    private boolean containsBadWords;
    private Date analyzedAt;
}
