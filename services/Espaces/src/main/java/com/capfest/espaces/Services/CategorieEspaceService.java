package com.capfest.espaces.Services;

import com.capfest.espaces.Entity.CategorieEspace;
import com.capfest.espaces.Repository.CategorieEspacesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategorieEspaceService {

    @Autowired
    CategorieEspacesRepository categorieEspacesRepository ;
    // Créer ou mettre à jour une catégorie
    public CategorieEspace saveCategorie(CategorieEspace categorie) {
        return categorieEspacesRepository.save(categorie);
    }

    // Récupérer toutes les catégories
    public List<CategorieEspace> getAllCategories() {
        return categorieEspacesRepository.findAll();
    }

    // Récupérer une catégorie par ID
    public Optional<CategorieEspace> getCategorieById(Integer id) {
        return categorieEspacesRepository.findById(id);
    }

    // Supprimer une catégorie par ID
    public void deleteCategorieById(Integer id) {
        categorieEspacesRepository.deleteById(id);
    }

}
