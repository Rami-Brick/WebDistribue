package esprit.tn.evenement.controller;


import esprit.tn.evenement.entities.Event;
import esprit.tn.evenement.services.IEventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/services/evenements")
public class EventController {

    private final IEventService eventService;

    @PostMapping("/add")
    public ResponseEntity<Event> addEvenement(@RequestBody Event evenement) {
        Event nouvelEvenement = eventService.addEvenement(evenement);
        return ResponseEntity.ok(nouvelEvenement);
    }


    // Récupérer tous les événements
    @GetMapping("/all")
    public ResponseEntity<List<Event>> getAllEvenements() {
        List<Event> evenements = eventService.retrieveAllEvenement();
        return ResponseEntity.ok(evenements);
    }

    // Récupérer un événement par ID
    @GetMapping("/{id}")
    public ResponseEntity<Event> getEvenementById(@PathVariable Long id) {
        Event evenement = eventService.retrieveEvenement(id);
        if (evenement != null) {
            return ResponseEntity.ok(evenement);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Supprimer un événement
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteEvenement(@PathVariable Long id) {
        eventService.removeEvenement(id);
        return ResponseEntity.ok("Événement supprimé avec succès");
    }

    // Supprimer tous les événements
    @DeleteMapping("/delete/all")
    public ResponseEntity<String> deleteAllEvenements() {
        eventService.removeAllEvenements();
        return ResponseEntity.ok("Tous les événements ont été supprimés avec succès");
    }

    @PutMapping("/update/{id}")
    public Event updateEvenement(@PathVariable Long id, @RequestBody Event updatedEvenement) {
        return eventService.updateEvenement(id, updatedEvenement);
    }


}
