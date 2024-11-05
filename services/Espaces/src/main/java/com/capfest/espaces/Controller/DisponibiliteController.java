package com.capfest.espaces.Controller;

import com.capfest.espaces.Entity.Disponibilite;
import com.capfest.espaces.Services.DisponibiliteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/disponibilites")

public class DisponibiliteController {
    @Autowired
    private DisponibiliteService disponibiliteService;

    // Créer une nouvelle disponibilité
    @PostMapping("/create")
    public ResponseEntity<Disponibilite> createDisponibilite(@RequestBody Disponibilite disponibilite) {
        Disponibilite savedDisponibilite = disponibiliteService.saveDisponibilite(disponibilite);
        return ResponseEntity.ok(savedDisponibilite);
    }

    // Récupérer toutes les disponibilités
    @GetMapping("/all")
    public ResponseEntity<List<Disponibilite>> getAllDisponibilites() {
        List<Disponibilite> disponibilites = disponibiliteService.getAllDisponibilites();
        return ResponseEntity.ok(disponibilites);
    }

    // Récupérer une disponibilité par ID
    @GetMapping("/{id}")
    public ResponseEntity<Disponibilite> getDisponibiliteById(@PathVariable Integer id) {
        Optional<Disponibilite> disponibilite = disponibiliteService.getDisponibiliteById(id);
        return disponibilite.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Mettre à jour une disponibilité
    @PutMapping("/update/{id}")
    public ResponseEntity<Disponibilite> updateDisponibilite(@PathVariable Integer id, @RequestBody Disponibilite updatedDisponibilite) {
        updatedDisponibilite.setId(id);
        Disponibilite savedDisponibilite = disponibiliteService.saveDisponibilite(updatedDisponibilite);
        return ResponseEntity.ok(savedDisponibilite);
    }

    // Supprimer une disponibilité
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteDisponibilite(@PathVariable Integer id) {
        disponibiliteService.deleteDisponibiliteById(id);
        return ResponseEntity.noContent().build();
    }
}
