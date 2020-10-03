package br.com.medportal.config.swagger;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

@Configuration
public class SwaggerConfiguration {
	
	public String version = "1.0";
	
	@Bean
    public Docket medPortalApi() {
		
		return new Docket(DocumentationType.SWAGGER_2)
				.apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("br.com.medportal.controller"))
                .paths(PathSelectors.any())
                .build();
    }
	
    private ApiInfo apiInfo() {
        return new ApiInfoBuilder().title("MEDPORTAL - API")
                .description("Documentação da API de acesso aos endpoints com Swagger").version(version).build();
    }

}
