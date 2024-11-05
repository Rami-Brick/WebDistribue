package com.capfest.reservation.Reservation;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    @Autowired
    private ReservationServices reservationService;

    /*@PostMapping("/create")
    public ResponseEntity<Reservation> createReservation(@RequestBody Reservation reservation, @AuthenticationPrincipal Jwt jwt) {
        if (jwt == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        String username = jwt.getClaim("given_name");
        String email = jwt.getClaim("email");
        String familyName = jwt.getClaim("family_name");
        String givenName = jwt.getClaim("given_name");
        String preferredUsername = jwt.getClaim("preferred_username");
        String name = jwt.getClaim("name");


        UserDTO user = new UserDTO();

        user.setSid(username);
        user.setEmail(email);
        user.setFamilyName(familyName);
        user.setGivenName(givenName);
        user.setName(name);
        user.setPreferredUsername(preferredUsername);

        reservation.setUser(user);

        return ResponseEntity.ok(reservationService.createReservation(reservation));
    }*/


    @PostMapping("/create")
    public ResponseEntity<Reservation> createReservation(@RequestBody Reservation reservation, @RequestParam Integer idEspace, @AuthenticationPrincipal Jwt jwt) {
        if (jwt == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        String username = jwt.getClaim("given_name");
        String email = jwt.getClaim("email");
        String familyName = jwt.getClaim("family_name");
        String givenName = jwt.getClaim("given_name");
        String preferredUsername = jwt.getClaim("preferred_username");
        String name = jwt.getClaim("name");

        UserDTO user = new UserDTO();
        user.setSid(username);
        user.setEmail(email);
        user.setFamilyName(familyName);
        user.setGivenName(givenName);
        user.setName(name);
        user.setPreferredUsername(preferredUsername);

        reservation.setUser(user);
        reservation.setStatut("En attente");

        Reservation createdReservation = reservationService.createReservation(reservation, idEspace);
        reservationService.sendNotificationEmail(createdReservation);

        return ResponseEntity.ok(reservationService.createReservation(reservation, idEspace));
    }



    @GetMapping("/all")
    public ResponseEntity<List<Reservation>> getAllReservations() {
        return ResponseEntity.ok(reservationService.getAllReservations());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reservation> getReservationById(@PathVariable String id) {
        return ResponseEntity.ok(reservationService.findById(id));
    }


    @PutMapping("/confirm")
    public ResponseEntity<String> confirmReservation(@RequestParam String reservationId) {
        Reservation reservation = reservationService.findById(reservationId);
        if (reservation == null) {
            return new ResponseEntity<>("Reservation not found", HttpStatus.NOT_FOUND);
        }
        reservation.setStatut("CONFIRMED");
        reservationService.updateReservation(reservation);
        return new ResponseEntity<>("Reservation confirmed successfully", HttpStatus.OK);
    }

    @PutMapping ("modify/{id}")
    public ResponseEntity<Reservation> updateReservation(@PathVariable String id, @RequestBody Reservation reservation) {
        return ResponseEntity.ok(reservationService.updateReservation(reservation));
    }

    @DeleteMapping("delete/{id}")
    public void deleteReservation(@PathVariable String id) {
        reservationService.deleteById(id);
    }



}
