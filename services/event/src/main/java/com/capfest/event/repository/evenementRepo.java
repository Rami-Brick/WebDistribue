package com.capfest.event.repository;

import com.capfest.event.entite.evenement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface evenementRepo extends JpaRepository<evenement, Long> {
}
