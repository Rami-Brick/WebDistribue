// package: com.capfest.forum.Controller

package com.capfest.forum.Controller;

import com.capfest.forum.entity.Discussion;
import com.capfest.forum.service.DiscussionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RequestMapping("/api/discussions")
@RestController
public class DiscussionController {

    @Autowired
    private DiscussionService discussionService;

    @PostMapping("/save")
    public ResponseEntity<Discussion> createDiscussion(@RequestBody Discussion discussion, @AuthenticationPrincipal Jwt jwt) {
        if (jwt == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        String username = jwt.getClaim("given_name"); // Adjust claim name if needed
        discussion.setUserId(username);

        try {
            Discussion createdDiscussion = discussionService.createDiscussion(discussion);
            return new ResponseEntity<>(createdDiscussion, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getall")
    public ResponseEntity<List<Discussion>> getAll() {
        List<Discussion> discussions = discussionService.findDiscussions();
        return ResponseEntity.ok(discussions);
    }

    @GetMapping("/user/discussions")
    public ResponseEntity<List<Discussion>> getDiscussionsByUser(@AuthenticationPrincipal Jwt jwt) {
        if (jwt == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        String username = jwt.getClaim("given_name");
        System.out.println("Username extracted from JWT: " + username);

        List<Discussion> discussions = discussionService.findDiscussionsByUser(username);
        System.out.println("Discussions retrieved: " + discussions);

        if (discussions.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return ResponseEntity.ok(discussions);
    }

    @PutMapping("/update/{discussionId}")
    public ResponseEntity<Discussion> updateDiscussion(
            @PathVariable String discussionId,
            @RequestBody Discussion updatedDiscussion,
            @AuthenticationPrincipal Jwt jwt) {

        if (jwt == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }


        try {
            Discussion existingDiscussion = discussionService.findDiscussionById(discussionId);
            if (existingDiscussion == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }



            existingDiscussion.setTitle(updatedDiscussion.getTitle());
            existingDiscussion.setContent(updatedDiscussion.getContent());

            Discussion savedDiscussion = discussionService.updateDiscussion(existingDiscussion, updatedDiscussion.getTags());
            return ResponseEntity.ok(savedDiscussion);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @DeleteMapping("/delete/{discussionId}")
    public ResponseEntity<Void> deleteDiscussion(
            @PathVariable String discussionId,
            @AuthenticationPrincipal Jwt jwt) {

        if (jwt == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        String username = jwt.getClaim("preferred_username");

        try {
            Discussion discussion = discussionService.findDiscussionById(discussionId);
            if (discussion == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }



            discussionService.deleteDiscussion(discussionId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/{discussionId}")
    public ResponseEntity<Discussion> getDiscussionById(@PathVariable String discussionId, @AuthenticationPrincipal Jwt jwt) {
        if (jwt == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        try {
            Discussion discussion = discussionService.findDiscussionById(discussionId);
            if (discussion == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return ResponseEntity.ok(discussion);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/like/{discussionId}")
    public ResponseEntity<Discussion> likeDiscussion(@PathVariable String discussionId, @AuthenticationPrincipal Jwt jwt) {
        if (jwt == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        String userId = jwt.getClaim("preferred_username");
        try {
            Discussion updatedDiscussion = discussionService.likeDiscussion(discussionId, userId);
            return ResponseEntity.ok(updatedDiscussion);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    @PostMapping("/unlike/{discussionId}")
    public ResponseEntity<Discussion> unlikeDiscussion(@PathVariable String discussionId, @AuthenticationPrincipal Jwt jwt) {
        if (jwt == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        String userId = jwt.getClaim("preferred_username");

        try {
            Discussion updatedDiscussion = discussionService.unlikeDiscussion(discussionId, userId);
            return ResponseEntity.ok(updatedDiscussion);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getWithComments/{discussionId}")
    public ResponseEntity<Discussion> getDiscussionWithComments(@PathVariable String discussionId) {
        Discussion discussion = discussionService.findDiscussionWithCommentsById(discussionId);
        if (discussion != null) {
            return ResponseEntity.ok(discussion);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


}
