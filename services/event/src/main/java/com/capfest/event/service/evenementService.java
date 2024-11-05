package com.capfest.event.service;


import com.capfest.event.entite.evenement;
import com.capfest.event.repository.evenementRepo;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class evenementService implements IevenementService {
    @Autowired
    private evenementRepo evenementRepos;

    @Override
    public List<evenement> retrieveAllEvenement() {
        return evenementRepos.findAll();
    }

    @Override
    public evenement addEvenement(evenement evenement) {
        return evenementRepos.save(evenement);
    }

    @Override
    public evenement retrieveEvenement(Long id) {
        return evenementRepos.findById(id).orElse(null);
    }
    @Override
    public void removeEvenement(Long id) {evenementRepos.deleteById(id);
    }
    @Override
    public void removeAllEvenements() {
        evenementRepos.deleteAll();
    }

    // Method to update an existing event
    @Override
    public evenement updateEvenement(Long id, evenement updatedEvenement) {
        return evenementRepos.findById(id)
                .map(existingEvenement -> {
                    existingEvenement.setNom(updatedEvenement.getNom());
                    existingEvenement.setDescription(updatedEvenement.getDescription());
                    existingEvenement.setDateDebut(updatedEvenement.getDateDebut());
                    existingEvenement.setDateFin(updatedEvenement.getDateFin());
                    existingEvenement.setLieu(updatedEvenement.getLieu());
                    existingEvenement.setNombreParticipants(updatedEvenement.getNombreParticipants());
                    existingEvenement.setOrganisateur(updatedEvenement.getOrganisateur());
                    existingEvenement.setPrix(updatedEvenement.getPrix());
                    return evenementRepos.save(existingEvenement);
                })
                .orElse(null); // Return null if the event was not found
    }
}
