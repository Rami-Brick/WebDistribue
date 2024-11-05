package com.capfest.reservation.Reservation;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;


@Getter
@Setter
@ToString
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Reservation")
public class Reservation {

    @Id
    private String id;
    private Date dateCreation;
    //private Utilisateur client;
    //reservation
    //private String userId;
    private UserDTO user;
    private List<ReservationItem> items;
    private EspaceDTO espace;
    private double montantTotal;
    private String statut; // EN_ATTENTE, CONFIRMED, ANNULEE


    private String eventName;
    private Date eventDate;
    private String eventTime;
    private int numberOfGuests;
    private String decorationPack;
    private String additionalNotes;
    private String organization;




 /*   public void calculerMontantTotal() {
        montantTotal = items.stream().mapToDouble(ReservationItem::getSousTotal).sum();
    }*/

    public void changerStatut(String nouveauStatut) {
        this.statut = nouveauStatut;
    }
}
