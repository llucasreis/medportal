package br.com.medportal.config.security;

import java.util.Date;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import br.com.medportal.modules.users.infra.hibernate.entities.User;
import io.jsonwebtoken.*;

@Service
public class TokenService {
	
	private static final Logger logger = LoggerFactory.getLogger(TokenService.class);
	
	@Value("${medportal.jwt.expiration}")
	private String expiration;
	
	@Value("${medportal.jwt.secret}")
	private String secret;
	
	public String generateToken(User user) {
		Date today = new Date();
		Date expiresDate = new Date(today.getTime() + Long.parseLong(expiration));
		
		return Jwts.builder()
				.setIssuer("MEDPORTAL API")
				.setSubject(user.getId().toString())
				.setIssuedAt(today)
				.setExpiration(expiresDate)
				.signWith(SignatureAlgorithm.HS256, secret)
				.compact();	
	}
	
	public boolean validateToken(String token) {
		try {
			System.out.println("Entrou aqui pra validar o token");
			System.out.println(token);
			Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
			return true;
		} catch (SignatureException e) {
			logger.error("Invalid JWT signature: {}", e.getMessage());
		} catch (MalformedJwtException e) {
			logger.error("Invalid JWT token: {}", e.getMessage());
		} catch (ExpiredJwtException e) {
			logger.error("JWT token is expired: {}", e.getMessage());
		} catch (UnsupportedJwtException e) {
			logger.error("JWT token is unsupported: {}", e.getMessage());
		} catch (IllegalArgumentException e) {
			logger.error("JWT claims string is empty: {}", e.getMessage());
		}
		
		return false;
	}
	
	public UUID getIdFromToken(String token) {
		String subject = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody().getSubject();
		
		return UUID.fromString(subject);
	}
	
	public String check() {
		return "Hello";
	}

}
