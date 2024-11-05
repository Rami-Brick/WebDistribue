package com.capfest.espaces.Controller;

import com.capfest.espaces.Entity.Espaces;
import com.capfest.espaces.Repository.EspacesRepository;
import com.capfest.espaces.Services.EspacesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

//@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/espaces/")
public class EspacesController {
        @Autowired
        EspacesService espacesService ;
        EspacesRepository espacesRepository;

    @PostMapping("/create")
    public void createEspace(@RequestBody Espaces espace) {
         espacesService.saveEspace(espace);
    }

    // Récupérer tous les espaces
  //  @GetMapping("/all")
    //public List<Espaces> getAllEspaces() {
      //  return espacesService.getAllEspaces();
    //}
    @GetMapping("/all")
    public ResponseEntity<List<Espaces>> getAllEspaces() {
        List<Espaces> discussions = espacesService.getAllEspaces();
        return ResponseEntity.ok(discussions);
    }

    // Récupérer un espace par ID
    @GetMapping("/{id}")
    public Optional<Espaces> getEspaceById(@PathVariable Integer id) {
        return espacesService.getEspaceById(id);
    }

   //  Mettre à jour un espace

    /*@PutMapping("/update/{id}")
    public ResponseEntity<Espaces> updateEspace(@PathVariable Integer id, @RequestBody Espaces updatedEspace) {
        // Vérifier si l'espace existe
        Optional<Espaces> existingEspace = espacesService.getEspaceById(id);
        if (existingEspace.isPresent()) {
            updatedEspace.setId(id); // Mettre à jour l'ID
            Espaces updated = espacesService.saveEspace(updatedEspace);
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }*/



    // Mettre à jour un espace
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateEspace(
            @PathVariable int id,
            @RequestBody Espaces updatedEspace) {
        try {
            System.out.println("Requête reçue pour mise à jour : " + updatedEspace);
            Espaces updated = espacesService.updateEspace(id, updatedEspace);
            System.out.println("Espace mis à jour : " + updated);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de la mise à jour.");
        }
    }





    // Supprimer un espace
    @DeleteMapping("/delete/{id}")
    public void deleteEspace(@PathVariable Integer id) {
        espacesService.deleteEspace(id);
    }
}
