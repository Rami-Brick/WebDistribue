package com.capfest.reservation.Reservation;


import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@Data
@Document
public class UserDTO {

    private String Sid;
    private boolean email_verified;
    private String name;
    private String preferredUsername;
    private String givenName;
    private String familyName;
    private String email;
}

