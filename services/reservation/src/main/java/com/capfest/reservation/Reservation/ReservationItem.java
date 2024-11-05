package com.capfest.reservation.Reservation;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@Data
@Document
public class ReservationItem {

    @Id
    private String id;
    private String nom;
    private String description;
    private Date dateDebut;
    private Date dateFin;
    private int quantite;
    private double prixUnitaire;
    private double sousTotal;
    // private Espace espace;ergergerg
   // private PackDecoration packDecoration;
//reservation
    public void calculerSousTotal() {
        this.sousTotal = prixUnitaire * quantite;
    }
}
