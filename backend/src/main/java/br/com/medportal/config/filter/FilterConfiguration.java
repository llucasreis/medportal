package br.com.medportal.config.filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import br.com.medportal.config.security.TokenService;
import br.com.medportal.modules.users.infra.hibernate.repositories.UserRepository;
import br.com.medportal.shared.filters.AuthenticationFilter;

@Configuration
public class FilterConfiguration {
	
	@Autowired
	private TokenService tokenService;
	
	@Autowired
	private UserRepository userRepository;
	
	@Bean
	public FilterRegistrationBean<AuthenticationFilter> authenticationFilter() {
		System.out.println("Passei aqui");
		System.out.println(tokenService.check());
		FilterRegistrationBean<AuthenticationFilter> registrationBean = new FilterRegistrationBean<>();
		
		registrationBean.setFilter(new AuthenticationFilter(tokenService, userRepository));
		
		registrationBean.addUrlPatterns("/appointment/*");
		registrationBean.addUrlPatterns("/doctor/*");
		
		return registrationBean;
		
	}

}
