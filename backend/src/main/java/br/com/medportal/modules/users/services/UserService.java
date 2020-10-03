package br.com.medportal.modules.users.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.medportal.config.message.MessageService;
import br.com.medportal.modules.users.dtos.UserDTO;
import br.com.medportal.modules.users.dtos.forms.UserFormDTO;
import br.com.medportal.modules.users.infra.hibernate.entities.User;
import br.com.medportal.modules.users.infra.hibernate.repositories.UserRepository;
import br.com.medportal.shared.dtos.error.ErrorFieldDTO;
import br.com.medportal.shared.dtos.response.ResponseStatusDTO;
import br.com.medportal.shared.enums.ValidServiceEnum;

@Service
public class UserService {
	
	@Autowired
	private MessageService msg;
	
	@Autowired
	PasswordEncoder encoder;
	
	@Autowired
	private UserRepository repository;
	
	public ResponseStatusDTO<UserDTO> create(UserFormDTO formDto) {
		String email = formDto.getEmail();
		
		ResponseStatusDTO<UserDTO> response = this.validUser(email, null, ValidServiceEnum.BOTH);
		
		if(response.getErrors().isEmpty()) {
			formDto.setPassword(encoder.encode(formDto.getPassword()));
			User user = repository.save(formDto.convert());
			
			response.setData(new UserDTO(user));
			
			response.setStatus(HttpStatus.CREATED);
		}
		
		return response;
	}

	private ResponseStatusDTO<UserDTO> validUser(String email, User user, ValidServiceEnum validService) {
		List<ErrorFieldDTO> errors = new ArrayList<ErrorFieldDTO>();
		
//		if(validService.equals(ValidServiceEnum.BOTH) || validService.equals(ValidServiceEnum.NOT_FOUND)) {
//			 ResponseStatusDTO<UserDTO> responseNotFound = this.validNotFound(productionLine, processPhase);
//			 
//		        if(!responseNotFound.getErrors().isEmpty()) {
//		 			return responseNotFound;
//		 		}
//		 }
		 
		 if(validService.equals(ValidServiceEnum.BOTH) || validService.equals(ValidServiceEnum.CONFLICT)) {
			 ResponseStatusDTO<UserDTO> responseConflict = this.validConflict(email, user);

		        if(!responseConflict.getErrors().isEmpty()) {
					return responseConflict;
				}
		 }
		
		return new ResponseStatusDTO<>(null, errors, HttpStatus.OK);
	}
	
	private ResponseStatusDTO<UserDTO> validConflict(String email, User user) {
		List<ErrorFieldDTO> errors = new ArrayList<ErrorFieldDTO>();
		
		if (email != null && user == null) {
			Optional<User> optional = repository.findByEmail(email);
			
			if(optional.isPresent()) {
				errors.add(new ErrorFieldDTO("email", msg.get("email.exists")));
			}
		}
		
		return new ResponseStatusDTO<UserDTO>(null, errors, HttpStatus.CONFLICT);
	}
	

}
