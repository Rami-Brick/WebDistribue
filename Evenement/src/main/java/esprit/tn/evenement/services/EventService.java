package esprit.tn.evenement.services;

import esprit.tn.evenement.entities.Event;
import esprit.tn.evenement.repository.EventRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class EventService implements IEventService{

    private final EventRepository eventRepos;

    @Override
    public List<Event> retrieveAllEvenement() {
        return (List<Event>) eventRepos.findAll();
    }

    @Override
    public Event addEvenement(Event evenement) {
        return eventRepos.save(evenement);
    }

    @Override
    public Event retrieveEvenement(Long id) {
        return eventRepos.findById(id).orElse(null);
    }

    @Override
    public void removeEvenement(Long id) {
        eventRepos.deleteById(id);
    }

    @Override
    public void removeAllEvenements() {
        eventRepos.deleteAll();
    }

    @Override
    public Event updateEvenement(Long id, Event updatedEvenement) {
        return  eventRepos.findById(id)
                .map(existingEvenement -> {
                    existingEvenement.setNom(updatedEvenement.getNom());
                    existingEvenement.setDescription(updatedEvenement.getDescription());
                    existingEvenement.setDateDebut(updatedEvenement.getDateDebut());
                    existingEvenement.setDateFin(updatedEvenement.getDateFin());
                    existingEvenement.setLieu(updatedEvenement.getLieu());
                    existingEvenement.setNombreParticipants(updatedEvenement.getNombreParticipants());
                    existingEvenement.setOrganisateur(updatedEvenement.getOrganisateur());
                    existingEvenement.setPrix(updatedEvenement.getPrix());
                    return eventRepos.save(existingEvenement);
                })
                .orElse(null); // Return null if the event was not found
    };

}
