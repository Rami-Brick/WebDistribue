package com.capfest.forum.Controller;

import com.capfest.forum.entity.Tag;
import com.capfest.forum.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/tags")
public class TagController {
    @Autowired
    private TagService tagService;
    @GetMapping("/search-fuzzy")
    public List<Tag> searchTagsFuzzy(
            @RequestParam("query") String query,
            @RequestParam(value = "limit", defaultValue = "10") int limit) {
        System.out.println("Endpoint '/search-fuzzy' invoked with query: " + query);
        List<Tag> tags = tagService.searchTagsFuzzy(query, limit);
        System.out.println("Tags found: " + tags);
        return tags;
    }


}
