package com.capfest.espaces.Services;

import com.capfest.espaces.Entity.Disponibilite;
import com.capfest.espaces.Repository.DisponibiliteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DisponibiliteService {
    @Autowired
    private DisponibiliteRepository disponibiliteRepository ;

    // Créer ou mettre à jour une disponibilité
    public Disponibilite saveDisponibilite(Disponibilite disponibilite) {
        return disponibiliteRepository.save(disponibilite);
    }

    // Récupérer toutes les disponibilités
    public List<Disponibilite> getAllDisponibilites() {
        return disponibiliteRepository.findAll();
    }

    // Récupérer une disponibilité par ID
    public Optional<Disponibilite> getDisponibiliteById(Integer id) {
        return disponibiliteRepository.findById(id);
    }

    // Supprimer une disponibilité par ID
    public void deleteDisponibiliteById(Integer id) {
        disponibiliteRepository.deleteById(id);
    }
}
