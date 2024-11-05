package com.capfest.event.control;


import com.capfest.event.entite.evenement;
import com.capfest.event.repository.evenementRepo;
import com.capfest.event.service.evenementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/evenement")
public class evenementControl {
    @Autowired
    private evenementService evenementServices;
    @Autowired
    private evenementRepo evenementRepository;

    // Ajouter un événement
    @PostMapping("/add")
    public ResponseEntity<evenement> addEvenement(@RequestBody evenement evenement) {
        evenement nouvelEvenement = evenementServices.addEvenement(evenement);
        return ResponseEntity.ok(nouvelEvenement);
    }


    // Récupérer tous les événements
    @GetMapping("/all")
    public ResponseEntity<List<evenement>> getAllEvenements() {
        List<evenement> evenements = evenementServices.retrieveAllEvenement();
        return ResponseEntity.ok(evenements);
    }

    // Récupérer un événement par ID
    @GetMapping("/{id}")
    public ResponseEntity<evenement> getEvenementById(@PathVariable Long id) {
        evenement evenement = evenementServices.retrieveEvenement(id);
        if (evenement != null) {
            return ResponseEntity.ok(evenement);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Supprimer un événement
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteEvenement(@PathVariable Long id) {
        evenementServices.removeEvenement(id);
        return ResponseEntity.ok("Événement supprimé avec succès");
    }

    // Supprimer tous les événements
    @DeleteMapping("/delete/all")
    public ResponseEntity<String> deleteAllEvenements() {
        evenementServices.removeAllEvenements();
        return ResponseEntity.ok("Tous les événements ont été supprimés avec succès");
    }

    @PutMapping("/update/{id}")
    public evenement updateEvenement(@PathVariable Long id, @RequestBody evenement updatedEvenement) {
        return evenementServices.updateEvenement(id, updatedEvenement);
    }
}

