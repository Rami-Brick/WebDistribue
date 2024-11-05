package com.capfest.gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpRequestDecorator;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import reactor.core.publisher.Mono;

@Configuration
public class TokenRelayConfig {

    @Bean
    public WebFilter tokenRelayFilter() {
        return (exchange, chain) -> exchange.getPrincipal()
                .cast(Authentication.class)
                .flatMap(authentication -> {
                    if (authentication instanceof JwtAuthenticationToken) {
                        String tokenValue = ((JwtAuthenticationToken) authentication).getToken().getTokenValue();

                        // Create new HttpHeaders and copy existing headers
                        HttpHeaders newHeaders = new HttpHeaders();
                        newHeaders.addAll(exchange.getRequest().getHeaders());

                        // Set or replace the Authorization header
                        newHeaders.set(HttpHeaders.AUTHORIZATION, "Bearer " + tokenValue);

                        // Create a new ServerHttpRequest with the modified headers
                        ServerHttpRequest mutatedRequest = new ServerHttpRequestDecorator(exchange.getRequest()) {
                            @Override
                            public HttpHeaders getHeaders() {
                                return newHeaders;
                            }
                        };

                        // Build a new ServerWebExchange with the mutated request
                        ServerWebExchange mutatedExchange = exchange.mutate()
                                .request(mutatedRequest)
                                .build();

                        // Proceed with the filter chain using the mutated exchange
                        return chain.filter(mutatedExchange);
                    }
                    // If not a JwtAuthenticationToken, proceed without modifying the request
                    return chain.filter(exchange);
                })
                .onErrorResume(e -> {
                    e.printStackTrace();  // Log errors if needed
                    return Mono.empty();
                });
    }
}
