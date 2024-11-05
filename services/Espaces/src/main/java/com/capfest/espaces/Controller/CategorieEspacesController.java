package com.capfest.espaces.Controller;

import com.capfest.espaces.Entity.CategorieEspace;
import com.capfest.espaces.Services.CategorieEspaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Gategorieespaces")

public class CategorieEspacesController {
    @Autowired

    CategorieEspaceService categorieEspaceService ;


    // Créer une nouvelle catégorie
    @PostMapping("/create")
    public ResponseEntity<CategorieEspace> createCategorie(@RequestBody CategorieEspace categorie) {
        CategorieEspace savedCategorie = categorieEspaceService.saveCategorie(categorie);
        return ResponseEntity.ok(savedCategorie);
    }

    // Récupérer toutes les catégories
    @GetMapping("/all")
    public ResponseEntity<List<CategorieEspace>> getAllCategories() {
        List<CategorieEspace> categories = categorieEspaceService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    // Récupérer une catégorie par ID
    @GetMapping("/{id}")
    public ResponseEntity<CategorieEspace> getCategorieById(@PathVariable Integer id) {
        Optional<CategorieEspace> categorie = categorieEspaceService.getCategorieById(id);
        return categorie.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Mettre à jour une catégorie
    @PutMapping("/update/{id}")
    public ResponseEntity<CategorieEspace> updateCategorie(@PathVariable Integer id, @RequestBody CategorieEspace updatedCategorie) {
        updatedCategorie.setId(id);
        CategorieEspace savedCategorie = categorieEspaceService.saveCategorie(updatedCategorie);
        return ResponseEntity.ok(savedCategorie);
    }

    // Supprimer une catégorie
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCategorie(@PathVariable Integer id) {
        categorieEspaceService.deleteCategorieById(id);
        return ResponseEntity.noContent().build();
    }

}
