package com.crickxplore;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class CrickXploreBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(CrickXploreBackendApplication.class, args);
    }
}
