package com.capfest.reservation;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class ReservationApplication {
//reservation
    public static void main(String[] args) {
        SpringApplication.run(ReservationApplication.class, args);
    }

}
