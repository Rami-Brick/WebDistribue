package com.example.gatewayapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.cloud.gateway.route.RouteLocator;


@EnableDiscoveryClient
@SpringBootApplication
public class GatewayApiApplication {

	public static void main(String[] args) {

		SpringApplication.run(GatewayApiApplication.class, args);
	}

	@Bean
	public RouteLocator gatewayRoutes(RouteLocatorBuilder builder){

		return builder.routes()
				.route("evenement", r->r.path("/api/services/evenement/**")
						.uri("http://localhost:9090"))

				.build();
	}
}
