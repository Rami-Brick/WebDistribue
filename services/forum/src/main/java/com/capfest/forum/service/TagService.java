package com.capfest.forum.service;

import com.capfest.forum.entity.Tag;
import com.capfest.forum.repository.TagRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class TagService {
    @Autowired
    private TagRepo tagRepository;
    public List<Tag> searchTagsFuzzy(String query, int limit) {
        String regex = ".*" + Pattern.quote(query.toLowerCase()) + ".*";

        List<Tag> tags = tagRepository.findByNameRegex(regex);
        return tags.stream().limit(limit).collect(Collectors.toList());
    }
}
