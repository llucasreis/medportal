package br.com.medportal.modules.appointments.infra.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.medportal.modules.appointments.dtos.AppointmentDTO;
import br.com.medportal.modules.appointments.dtos.forms.AppointmentFormDTO;
import br.com.medportal.modules.appointments.infra.hibernate.entities.Appointment;
import br.com.medportal.modules.appointments.services.AppointmentService;
import br.com.medportal.shared.dtos.response.ResponseDTO;
import br.com.medportal.shared.dtos.response.ResponseStatusDTO;

@RestController
@RequestMapping("/appointment")
public class AppointmentController {
	
	@Autowired
	private AppointmentService service;
	
	@PostMapping
	public ResponseEntity<ResponseDTO<AppointmentDTO>> create(@Valid @RequestBody AppointmentFormDTO formDto) {
		ResponseStatusDTO<AppointmentDTO> response = service.create(formDto);
		
		return new ResponseEntity<>(new ResponseDTO<AppointmentDTO>(
				response.getData(),
				response.getErrors()), response.getStatus());
	}
	
	@GetMapping
	public Page<AppointmentDTO> find(
			@PageableDefault(sort = "id", direction = Direction.DESC, page = 0, size = 10) Pageable pagination) {
		Page<Appointment> appointments = service.find(pagination);
		
		return AppointmentDTO.convert(appointments);
	}

}
