package br.com.medportal.modules.users.infra.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.medportal.modules.users.dtos.SessionDTO;
import br.com.medportal.modules.users.dtos.forms.SessionFormDTO;
import br.com.medportal.modules.users.services.SessionService;
import br.com.medportal.shared.dtos.response.ResponseDTO;
import br.com.medportal.shared.dtos.response.ResponseStatusDTO;

@RestController
@RequestMapping("/session")
public class SessionController {
	
	@Autowired
	private SessionService service;
	
	@PostMapping
	public ResponseEntity<ResponseDTO<SessionDTO>> create(@Valid @RequestBody SessionFormDTO formDto) {
		ResponseStatusDTO<SessionDTO> response = service.create(formDto);
		
		return new ResponseEntity<>(new ResponseDTO<SessionDTO>(
				response.getData(),
				response.getErrors()), response.getStatus());
	}

}
