package com.capfest.reservation.Reservation;


import com.capfest.reservation.Reservation.clients.EspaceClient;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationServices {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private EspaceClient espaceClient;

    public Reservation createReservation(Reservation reservation, Integer idEspace) {
        var espace = espaceClient.findEspace(idEspace);
        if (espace == null) {
            throw new RuntimeException("Espace not found");
        }

        reservation.setEspace(espace);
        return reservationRepository.save(reservation);
    }

    public ReservationServices(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }


    public Reservation updateReservation(Reservation reservation) {
        //reservation.calculerMontantTotal();
        return reservationRepository.save(reservation);
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }



    public Reservation save(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    public Reservation findById(String id) {
        return reservationRepository.findById(id).orElse(null);
    }

    public void deleteById(String id) {
        reservationRepository.deleteById(id);
    }

    public void deleteAll() {
        reservationRepository.deleteAll();
    }

    public Iterable<Reservation> findAll() {
        return reservationRepository.findAll();
    }

/*
    public void sendNotificationEmail(Reservation reservation) {
        try {
            Jwt jwt = (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

            // Extract the user's email from the JWT token
            String userEmail = jwt.getClaimAsString("email");

            helper.setTo(userEmail);  // Use the extracted email from the JWT token
            helper.setSubject("Reservation Confirmation");

            String confirmationLink = "http://localhost:8222/api/reservations/confirm?reservationId=" + reservation.getId();

            String htmlContent = "<html>" +
                    "<head>" +
                    "<style>" +
                    "  body { font-family: Arial, sans-serif; line-height: 1.6; }" +
                    "  .title { color: #333; font-size: 16px; font-weight: bold; }" +
                    "</style>" +
                    "</head>" +
                    "<body>" +
                    "<p>Dear " + reservation.getUser().getGivenName() + ",</p>" +
                    "<p>Your reservation for the event '<span class='title'>" + reservation.getEventName() + "</span>' has been created successfully.</p>" +
                    "<p>Please click the link below to confirm your reservation:</p>" +
                    "<p><a href='" + confirmationLink + "'>Confirm Reservation</a></p>" +
                    "<p>Event Details:</p>" +
                    "<ul>" +
                    "<li>Date: " + reservation.getEventDate() + "</li>" +
                    "<li>Time: " + reservation.getEventTime() + "</li>" +
                    "<li>Number of Guests: " + reservation.getNumberOfGuests() + "</li>" +
                    "<li>Decoration Pack: " + reservation.getDecorationPack() + "</li>" +
                    "<li>Additional Notes: " + reservation.getAdditionalNotes() + "</li>" +
                    "<li>Organization: " + reservation.getOrganization() + "</li>" +
                    "</ul>" +
                    "</body>" +
                    "</html>";

            helper.setText(htmlContent, true);  // Set to true to indicate HTML content

            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            // Log the exception (e.g., use a logger)
            e.printStackTrace();
        }
    }
*/


    public void sendNotificationEmail(Reservation reservation) {
        try {
            Jwt jwt = (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

            // Extract the user's email from the JWT token
            String userEmail = jwt.getClaimAsString("email");

            helper.setTo(userEmail);  // Use the extracted email from the JWT token
            helper.setSubject("Reservation Confirmation");

            String confirmationLink = "http://localhost:4200/confirm?reservationId=" + reservation.getId();

            String htmlContent = "<html>" +
                    "<head>" +
                    "<style>" +
                    "  body { font-family: Arial, sans-serif; line-height: 1.6; }" +
                    "  .title { color: #333; font-size: 16px; font-weight: bold; }" +
                    "</style>" +
                    "</head>" +
                    "<body>" +
                    "<p>Dear " + reservation.getUser().getGivenName() + ",</p>" +
                    "<p>Your reservation for the event '<span class='title'>" + reservation.getEventName() + "</span>' has been created successfully.</p>" +
                    "<p>Please click the link below to confirm your reservation:</p>" +
                    "<p><a href='" + confirmationLink + "'>Confirm Reservation</a></p>" +
                    "<p>Event Details:</p>" +
                    "<ul>" +
                    "<li>Date: " + reservation.getEventDate() + "</li>" +
                    "<li>Time: " + reservation.getEventTime() + "</li>" +
                    "<li>Number of Guests: " + reservation.getNumberOfGuests() + "</li>" +
                    "<li>Decoration Pack: " + reservation.getDecorationPack() + "</li>" +
                    "<li>Additional Notes: " + reservation.getAdditionalNotes() + "</li>" +
                    "<li>Organization: " + reservation.getOrganization() + "</li>" +
                    "</ul>" +
                    "</body>" +
                    "</html>";

            helper.setText(htmlContent, true);  // Set to true to indicate HTML content

            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            // Log the exception (e.g., use a logger)
            e.printStackTrace();
        }
    }

}
