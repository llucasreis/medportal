package br.com.medportal.modules.users.infra.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.medportal.modules.users.dtos.UserDTO;
import br.com.medportal.modules.users.dtos.forms.UserFormDTO;
import br.com.medportal.modules.users.services.UserService;
import br.com.medportal.shared.dtos.response.ResponseDTO;
import br.com.medportal.shared.dtos.response.ResponseStatusDTO;

@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private UserService service;
	
	@PostMapping
	public ResponseEntity<ResponseDTO<UserDTO>> create(@Valid @RequestBody UserFormDTO formDto) {
		ResponseStatusDTO<UserDTO> response = service.create(formDto);
		
		return new ResponseEntity<>(new ResponseDTO<UserDTO>(
				response.getData(),
				response.getErrors()), response.getStatus());
	}
	
	@GetMapping
	public String hello() {
		return "Hello, World!";
	}

}
