package esprit.tn.webdistribue;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class WebDistribueApplication {

    public static void main(String[] args) {
        SpringApplication.run(WebDistribueApplication.class, args);
    }

}
