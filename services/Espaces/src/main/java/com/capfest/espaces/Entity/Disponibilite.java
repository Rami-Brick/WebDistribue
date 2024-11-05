package com.capfest.espaces.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Disponibilite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private boolean disponible;
    private Date dateEntree;
    private Date dateSortie;

    @ManyToOne
    @JoinColumn(name = "espace_id")
    @JsonBackReference
    private Espaces espace;

}
