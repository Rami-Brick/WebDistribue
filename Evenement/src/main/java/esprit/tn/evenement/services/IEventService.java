package esprit.tn.evenement.services;

import esprit.tn.evenement.entities.Event;

import java.util.List;

public interface IEventService {

    List<Event> retrieveAllEvenement();

    Event addEvenement(Event evenement) ;

    Event retrieveEvenement(Long id);

    void removeEvenement(Long id);
    void removeAllEvenements() ;
    // Method to update an existing event
    Event updateEvenement(Long id, Event updatedEvenement);
}
