package br.com.medportal.modules.users.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.medportal.config.message.MessageService;
import br.com.medportal.config.security.TokenService;
import br.com.medportal.modules.users.dtos.SessionDTO;
import br.com.medportal.modules.users.dtos.UserDTO;
import br.com.medportal.modules.users.dtos.forms.SessionFormDTO;
import br.com.medportal.modules.users.infra.hibernate.entities.User;
import br.com.medportal.modules.users.infra.hibernate.repositories.UserRepository;
import br.com.medportal.shared.dtos.error.ErrorFieldDTO;
import br.com.medportal.shared.dtos.response.ResponseStatusDTO;
import br.com.medportal.shared.enums.ValidServiceEnum;

@Service
public class SessionService {
	
	@Autowired
	private MessageService msg;
	
	@Autowired
	PasswordEncoder encoder;
	
	@Autowired
	private TokenService tokenService;
	
	@Autowired
	private UserRepository userRepository;
	
	public ResponseStatusDTO<SessionDTO> create(SessionFormDTO formDto) {
		String email = formDto.getEmail();
		String password = formDto.getPassword();
		
		ResponseStatusDTO<SessionDTO> response = this.validSession(email, password);
		
		if(response.getErrors().isEmpty()) {
			User user = userRepository.findByEmail(email).get();
			String token = tokenService.generateToken(user);
			
			response.setData(new SessionDTO(user, token));
		}
		
		return response;
	}
	
	private ResponseStatusDTO<SessionDTO> validSession(String email, String password) {
		List<ErrorFieldDTO> errors = new ArrayList<ErrorFieldDTO>();
		
		ResponseStatusDTO<SessionDTO> response = this.validUnauthorized(email, password);
		
		if(!response.getErrors().isEmpty()) return response;
		
		return new ResponseStatusDTO<>(null, errors, HttpStatus.OK);
	}
	
	private ResponseStatusDTO<SessionDTO> validUnauthorized(String email, String password) {
		List<ErrorFieldDTO> errors = new ArrayList<ErrorFieldDTO>();
		
		if(email != null && password != null) {
			Optional<User> optional = userRepository.findByEmail(email);
			
			if(!optional.isPresent()) {
				errors.add(new ErrorFieldDTO("email", msg.get("email.error")));
			} else {
				User user = optional.get();
				
				boolean passwordMatched = encoder.matches(password, user.getPassword());
				
				if(!passwordMatched) {
					errors.add(new ErrorFieldDTO("password", msg.get("password.error")));
				}
			}
		}
		
		return new ResponseStatusDTO<SessionDTO>(null, errors, HttpStatus.UNAUTHORIZED);
	}

}
