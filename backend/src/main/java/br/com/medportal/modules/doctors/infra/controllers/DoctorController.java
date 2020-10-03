package br.com.medportal.modules.doctors.infra.controllers;

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

import br.com.medportal.modules.doctors.dtos.DoctorDTO;
import br.com.medportal.modules.doctors.dtos.forms.DoctorFormDTO;
import br.com.medportal.modules.doctors.infra.hibernate.entities.Doctor;
import br.com.medportal.modules.doctors.services.DoctorService;
import br.com.medportal.shared.dtos.response.ResponseDTO;
import br.com.medportal.shared.dtos.response.ResponseStatusDTO;

@RestController
@RequestMapping("/doctor")
public class DoctorController {
	
	@Autowired
	private DoctorService service;
	
	@PostMapping
	public ResponseEntity<ResponseDTO<DoctorDTO>> create(@Valid @RequestBody DoctorFormDTO formDto) {
		ResponseStatusDTO<DoctorDTO> response = service.create(formDto);
		
		return new ResponseEntity<>(new ResponseDTO<DoctorDTO>(
				response.getData(),
				response.getErrors()), response.getStatus());
	}
	
	@GetMapping
	public Page<DoctorDTO> find(
			@PageableDefault(sort = "id", direction = Direction.DESC, page = 0, size = 10) Pageable pagination) {
		Page<Doctor> doctors = service.find(pagination);
		
		return DoctorDTO.convert(doctors);
	}
	

}
