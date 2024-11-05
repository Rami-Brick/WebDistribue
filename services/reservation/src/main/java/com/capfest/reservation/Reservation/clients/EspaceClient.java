package com.capfest.reservation.Reservation.clients;


import com.capfest.reservation.Reservation.EspaceDTO;
import com.capfest.reservation.Reservation.configuration.FeignConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "Espaces-service", url = "http://localhost:8222/api/espaces", configuration = FeignConfig.class)
public interface EspaceClient {

    @GetMapping("/{id}")
    EspaceDTO findEspace(@PathVariable("id") Integer id);
}