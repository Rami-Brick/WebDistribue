package com.capfest.reservation.Reservation;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@Data
@Document
public class EspaceDTO {
    @Id
    private String id;
    private String nom;
    private String description;
    private String adresse;
    private Double latitude;
    private Double longitude;
    private Integer capacite;
    private Double tarif;
    private boolean disponibilite;
    private List<String> photos;
}


