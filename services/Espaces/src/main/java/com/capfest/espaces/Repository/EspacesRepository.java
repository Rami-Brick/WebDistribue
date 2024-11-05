package com.capfest.espaces.Repository;

import com.capfest.espaces.Entity.Espaces;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface EspacesRepository extends JpaRepository<Espaces,Integer> {

}
