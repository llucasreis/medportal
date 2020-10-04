package br.com.medportal.shared.filters;

import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import br.com.medportal.config.security.TokenService;
import br.com.medportal.modules.users.infra.hibernate.entities.User;
import br.com.medportal.modules.users.infra.hibernate.repositories.UserRepository;

//@Component
public class AuthenticationFilter implements Filter {
	
	private TokenService tokenService;
	private UserRepository userRepository;
	
	public AuthenticationFilter(TokenService tokenService, UserRepository userRepository) {
		this.tokenService = tokenService;
		this.userRepository = userRepository;
	}
	
	private static final Logger logger = LoggerFactory.getLogger(AuthenticationFilter.class);
	
	@Override
	public void doFilter(final ServletRequest request, final ServletResponse response, final FilterChain chain)
			throws IOException, ServletException {
		
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;
		
		if(!req.getMethod().equalsIgnoreCase("OPTIONS")) {
			String token = getToken(req);
			if(token != null && tokenService.validateToken(token)) {
				chain.doFilter(request, response);	
			} else {
				logger.error("Cannot authorizate user");
				res.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token inválido.");
			}
		} else {
			res.setHeader("Access-Control-Allow-Origin", "*");
			res.setHeader("Access-Control-Allow-Methods", "POST,GET,DELETE,PUT");
			res.setHeader("Access-Control-Max-Age", "3600");
			res.setHeader("Access-Control-Allow-Headers", "Access-Control-Expose-Headers"+"Authorization, content-type," +
	          "USERID"+"ROLE"+
	                  "access-control-request-headers,access-control-request-method,accept,origin,authorization,x-requested-with,responseType,observe");
			res.setStatus(HttpServletResponse.SC_OK);
		}	
	}
	
	private String getToken(HttpServletRequest request) {
		String headerAuth = request.getHeader("Authorization");
		
		if(StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
			return headerAuth.substring(7, headerAuth.length());
		}
		
		return null;
	}
	

}
