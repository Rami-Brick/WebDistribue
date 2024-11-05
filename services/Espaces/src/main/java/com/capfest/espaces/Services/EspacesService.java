package com.capfest.espaces.Services;

import com.capfest.espaces.Entity.CategorieEspace;
import com.capfest.espaces.Entity.Disponibilite;
import com.capfest.espaces.Entity.Espaces;
import com.capfest.espaces.Repository.CategorieEspacesRepository;
import com.capfest.espaces.Repository.DisponibiliteRepository;
import com.capfest.espaces.Repository.EspacesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EspacesService {
    @Autowired
    private EspacesRepository espacesRepository ;
    @Autowired
  private CategorieEspacesRepository categorieEspacesRepository  ;
    @Autowired
    private DisponibiliteRepository disponibiliteRepository  ;
    // Créer ou mettre à jour un espace

    public Espaces saveEspace(Espaces espace) {
        return espacesRepository.save(espace); // Retourner l'objet sauvegardé
    }
    // Récupérer tous les espaces
    public List<Espaces> getAllEspaces() {
        return espacesRepository.findAll();
    }

    // Récupérer un espace par ID
    public Optional<Espaces> getEspaceById(Integer id) {
        return espacesRepository.findById(id);
    }

    // Supprimer un espace par ID
    public void deleteEspace(Integer id) {
        espacesRepository.deleteById(id);
    }
    // Trouver un espace par ID
    public Espaces findEspaceById(Integer id) {
        return espacesRepository.findById(id).orElse(null);
    }
     public Espaces updateEspace(int id, Espaces updatedEspace) {
        // Récupérer l'espace existant par son ID
        Espaces existingEspace = espacesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Espace avec ID " + id + " non trouvé"));

        // Mettez à jour chaque champ seulement s'il n'est pas null
        if (updatedEspace.getNom() != null) {
            existingEspace.setNom(updatedEspace.getNom());
        }
        if (updatedEspace.getDescription() != null) {
            existingEspace.setDescription(updatedEspace.getDescription());
        }
        if (updatedEspace.getAdresse() != null) {
            existingEspace.setAdresse(updatedEspace.getAdresse());
        }
        if (updatedEspace.getLatitude() != null) {
            existingEspace.setLatitude(updatedEspace.getLatitude());
        }
        if (updatedEspace.getLongitude() != null) {
            existingEspace.setLongitude(updatedEspace.getLongitude());
        }
        if (updatedEspace.getCapacite() != null) {
            existingEspace.setCapacite(updatedEspace.getCapacite());
        }
        if (updatedEspace.getTarif() != null) {
            existingEspace.setTarif(updatedEspace.getTarif());
        }

        // Mettre à jour la disponibilité
        existingEspace.setDisponibilite(updatedEspace.isDisponibilite());

        // Mettre à jour les photos
        if (updatedEspace.getPhotos() != null && !updatedEspace.getPhotos().isEmpty()) {
            existingEspace.setPhotos(updatedEspace.getPhotos());
        }

        // Enregistrer les modifications dans la base de données
        return espacesRepository.save(existingEspace);
    }




}
