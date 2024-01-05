package com.eumWeb.main;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@MapperScan(basePackages = {"com.eumWeb.main"})
public class EumWebApplication {

	public static void main(String[] args) {
		SpringApplication.run(EumWebApplication.class, args);
	}

}
