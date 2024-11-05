package com.capfest.event.service;


import com.capfest.event.entite.evenement;

import java.util.List;

public interface IevenementService{
    List<evenement> retrieveAllEvenement();

    evenement addEvenement(evenement evenement) ;

    evenement retrieveEvenement(Long id);

    void removeEvenement(Long id);
    void removeAllEvenements() ;
    // Method to update an existing event
    evenement updateEvenement(Long id, evenement updatedEvenement);

}
