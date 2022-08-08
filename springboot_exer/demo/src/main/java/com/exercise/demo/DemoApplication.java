package com.exercise.demo;

import java.util.List;
import java.util.ArrayList;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@EnableAutoConfiguration
@SpringBootApplication
public class DemoApplication {

    @RequestMapping("/")
    private String home() {
		List<String> homeStrs = new ArrayList<>();
		homeStrs.add("Home");
		homeStrs.add("Route");
        return String.join(" ", homeStrs);
    }
	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

}
