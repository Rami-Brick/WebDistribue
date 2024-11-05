package com.capfest.forum.service;

import com.capfest.forum.entity.Comment;
import com.capfest.forum.entity.Discussion;
import com.capfest.forum.entity.DiscussionStatus;
import com.capfest.forum.entity.Tag;
import com.capfest.forum.repository.CommentRepo;
import com.capfest.forum.repository.DiscussionRepo;
import com.capfest.forum.repository.TagRepo;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.mail.javamail.MimeMessageHelper;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class DiscussionService {
    @Autowired
    private DiscussionRepo discussionRepository;
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private TagRepo tagRepository;
    @Autowired
    private CommentRepo commentRepository;

    public Discussion createDiscussion(Discussion discussion) {
        // Debugging log to verify bad word detection
        if (containsBadWords(discussion.getTitle())) {
            System.out.println("Bad word detected in title: " + discussion.getTitle());
        }
        if (containsBadWords(discussion.getContent())) {
            System.out.println("Bad word detected in content: " + discussion.getContent());
        }

        // If bad words are found, set the status to REJECTED
        if (containsBadWords(discussion.getTitle()) || containsBadWords(discussion.getContent())) {
            discussion.setStatus(DiscussionStatus.REJECTED);
            sendNotificationEmail(discussion);

        } else {
            discussion.setStatus(DiscussionStatus.PENDING_APPROVAL);
        }

        // Set other discussion properties
        discussion.setDiscussionId(UUID.randomUUID().toString());
        discussion.setCreatedAt(new Date());
        discussion.setLikes(0);
        discussion.setComments(0);
        discussion.setViewCount(0);

        updateTagUsageCount(discussion.getTags(), null, discussion);

        // Save and return the discussion
        return discussionRepository.save(discussion);
    }

    private void updateTagUsageCount(List<String> newTags, List<String> oldTags,Discussion discussion) {
        List<String> normalizedNewTags = newTags.stream()
                .map(tag -> tag.trim().toLowerCase())
                .collect(Collectors.toList());

        if (oldTags != null) {
            List<String> normalizedOldTags = oldTags.stream()
                    .map(tag -> tag.trim().toLowerCase())
                    .collect(Collectors.toList());

            for (String oldTagName : normalizedOldTags) {
                if (!normalizedNewTags.contains(oldTagName)) {
                    Tag tag = tagRepository.findByName(oldTagName).orElse(null);
                    if (tag != null) {
                        tag.setUsageCount(tag.getUsageCount() - 1);
                        if (tag.getUsageCount() <= 0) {
                            tagRepository.delete(tag);
                        } else {
                            tagRepository.save(tag);
                        }
                    }
                }
            }
        }

        for (String newTagName : normalizedNewTags) {
            Tag tag = tagRepository.findByName(newTagName).orElse(null);
            if (tag == null) {
                tag = Tag.builder()
                        .id(UUID.randomUUID().toString())
                        .name(newTagName)
                        .usageCount(1)
                        .build();
            } else {
                tag.setUsageCount(tag.getUsageCount() + 1);
            }
            tagRepository.save(tag);
        }

        discussion.setTags(normalizedNewTags);
    }
    public List<Discussion> findDiscussions() {
        return discussionRepository.findAll().stream()
                .filter(discussion -> discussion.getStatus() == DiscussionStatus.APPROVED)
                .collect(Collectors.toList());
    }

    // DiscussionService.java
    public List<Discussion> findDiscussionsByUser(String userId) {
        List<Discussion> discussions = discussionRepository.findByUserId(userId);
        System.out.println("Discussions found for userId " + userId + ": " + discussions.size());
        return discussions;
    }
    public Discussion updateDiscussion(Discussion existingDiscussion, List<String> newTags) {
        List<String> oldTags = existingDiscussion.getTags();

        updateTagUsageCount(newTags, oldTags, existingDiscussion);

        existingDiscussion.setTags(newTags);
        existingDiscussion.setStatus(DiscussionStatus.PENDING_APPROVAL);

        return discussionRepository.save(existingDiscussion);
    }
    // DiscussionService.java
    public Discussion findDiscussionById(String discussionId) {
        return discussionRepository.findById(discussionId).orElse(null);
    }
    public void deleteDiscussion(String discussionId) {
        discussionRepository.deleteById(discussionId);
    }
    // DiscussionService.java
    public Discussion unlikeDiscussion(String discussionId, String userId) {
        Discussion discussion = findDiscussionById(discussionId);
        if (discussion != null && discussion.getLikedByUserIds().contains(userId)) {
            discussion.getLikedByUserIds().remove(userId);
            discussion.setLikes(discussion.getLikes() - 1);
            return discussionRepository.save(discussion);
        }
        throw new RuntimeException("Discussion not found or user has not liked this discussion");
    }

    public void sendNotificationEmail( Discussion discussion) {
        try {
            Jwt jwt = (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

            // Extract the user's email from the JWT token
            String userEmail = jwt.getClaimAsString("email");

            helper.setTo(userEmail);  // Use the extracted email from the JWT token
            helper.setSubject("Bad Word Detected in Discussion");

            String htmlContent = "<html>" +
                    "<head>" +
                    "<style>" +
                    "  body { font-family: Arial, sans-serif; line-height: 1.6; }" +
                    "  .warning { color: red; font-weight: bold; }" +
                    "  .title { color: #333; font-size: 16px; font-weight: bold; }" +
                    "</style>" +
                    "</head>" +
                    "<body>" +
                    "<p>&#9888; A discussion titled '<span class='title'>" + discussion.getTitle() + "</span>' was detected to contain inappropriate content and has been marked as <span class='warning'>REJECTED</span>.</p>" +
                    "<p class='warning'>&#9888; If you repeat this behavior, your account will be <strong>banned</strong>.</p>" +
                    "</body>" +
                    "</html>";

            helper.setText(htmlContent, true);  // Set to true to indicate HTML content

            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            // Log the exception (e.g., use a logger)
            e.printStackTrace();
        }
    }
    public Discussion likeDiscussion(String discussionId, String userId) {
        Discussion discussion = findDiscussionById(discussionId);
        if (discussion != null) {
            if (!discussion.getLikedByUserIds().contains(userId)) {
                discussion.getLikedByUserIds().add(userId);
                discussion.setLikes(discussion.getLikes() + 1);
                return discussionRepository.save(discussion);
            }
            throw new RuntimeException("User has already liked this discussion");
        }
        throw new RuntimeException("Discussion not found");
    }
    public Discussion findDiscussionWithCommentsById(String discussionId) {
        Discussion discussion = discussionRepository.findById(discussionId).orElse(null);
        if (discussion != null) {
            List<Comment> comments = commentRepository.findByDiscussionId(discussionId);
            discussion.setCommentList(comments);
        }
        return discussion;
    }
    private boolean containsBadWords(String content) {
        // List of bad words (English, French, Arabic)
        List<String> badWords = Arrays.asList(
                "asshole", "bastard", "bitch", "bullshit", "cunt", "damn", "dick", "douchebag", "fag",
                "faggot", "fuck", "motherfucker", "piss", "prick", "retard", "shit", "slut", "whore",
                "wanker", "cock", "cocksucker", "bastard", "bitchass", "nigger", "nigga", "rape", "twat",
                "idiot", "dumbass", "jackass", "pussy", "tits", "balls", "spastic", "skank", "slutty",
                "shithead", "cockhead", "tits", "pussy", "dumbfuck", "goddamn",

                // French Bad Words
                "connard", "putain", "salopard", "enculé", "merde", "connasse", "pute", "bordel", "fils de pute",
                "salope", "batard", "casser les couilles", "branler", "pédé", "con", "vicelard", "enculer",
                "suceur", "nique ta mère", "niquer", "foutre", "caca", "tronche", "merdeux", "gros con",
                "sucer", "baiser", "cul",

                // Arabic Bad Words
                "لعنة", "كلب", "زنا", "ابن الكلب", "عاهرة", "معتوه", "أحمق", "عاهرة", "سافل",
                "شاذ", "قذر", "غبي", "خبيث", "منافق", "مغتصب", "طاغية", "فاسق", "لواط", "كذبة", "بلطجي",
                "سفاح", "بذيء", "مؤذي", "وقح", "نتن", "حقير"
        );

        // Loop through each bad word and check if it matches the content
        for (String badWord : badWords) {
            // Escape special characters for regex
            String escapedBadWord = escapeSpecialCharacters(badWord);

            // Check if the content matches the regex for the bad word
            if (content != null && content.toLowerCase().matches("(?i).*\\b" + escapedBadWord + "\\b.*")) {
                return true; // Bad word detected
            }
        }
        return false; // No bad words detected
    }

    // Helper method to escape special characters for regex
    // Helper method to escape special characters for regex
    private String escapeSpecialCharacters(String badWord) {
        // Escape regex special characters like . * + ? ^ = ! : $ { } ( ) | [ ] / \
        return badWord.replaceAll("([\\\\.*+?^=!:${}()|\\[\\]\\/\\\\])", "\\\\$1");
    }


}
