package br.com.medportal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.web.config.EnableSpringDataWebSupport;

import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication(exclude = {
        SecurityAutoConfiguration.class})
@EnableSpringDataWebSupport
@EnableSwagger2
public class MedportalApplication {

	public static void main(String[] args) {
		SpringApplication.run(MedportalApplication.class, args);
	}

}
