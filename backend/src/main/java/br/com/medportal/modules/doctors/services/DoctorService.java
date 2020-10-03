package br.com.medportal.modules.doctors.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import br.com.medportal.config.message.MessageService;
import br.com.medportal.modules.doctors.dtos.DoctorDTO;
import br.com.medportal.modules.doctors.dtos.forms.DoctorFormDTO;
import br.com.medportal.modules.doctors.infra.hibernate.entities.Doctor;
import br.com.medportal.modules.doctors.infra.hibernate.repositories.DoctorRepository;
import br.com.medportal.shared.dtos.error.ErrorFieldDTO;
import br.com.medportal.shared.dtos.response.ResponseStatusDTO;
import br.com.medportal.shared.enums.ValidServiceEnum;

@Service
public class DoctorService {
	
	@Autowired
	private MessageService msg;
	
	@Autowired
	private DoctorRepository repository;
	
	public ResponseStatusDTO<DoctorDTO> create(DoctorFormDTO formDto) {
		ResponseStatusDTO<DoctorDTO> response = this.validDoctor(null, ValidServiceEnum.BOTH);
		
		if(response.getErrors().isEmpty()) {
			Doctor doctor = repository.save(formDto.convert());
			
			response.setData(new DoctorDTO(doctor));
			
			response.setStatus(HttpStatus.CREATED);
		}
		
		return response;
	}
	
	public Page<Doctor> find(Pageable pagination) {
		Page<Doctor> doctors = repository.findAll(pagination);
		
		return doctors;
	}
	
	private ResponseStatusDTO<DoctorDTO> validDoctor(Doctor doctor, ValidServiceEnum validService) {
		List<ErrorFieldDTO> errors = new ArrayList<ErrorFieldDTO>();
		
//		if(validService.equals(ValidServiceEnum.BOTH) || validService.equals(ValidServiceEnum.NOT_FOUND)) {
//		 ResponseStatusDTO<UserDTO> responseNotFound = this.validNotFound(productionLine, processPhase);
//		 
//	        if(!responseNotFound.getErrors().isEmpty()) {
//	 			return responseNotFound;
//	 		}
//	 }
	 
//	 if(validService.equals(ValidServiceEnum.BOTH) || validService.equals(ValidServiceEnum.CONFLICT)) {
//		 ResponseStatusDTO<UserDTO> responseConflict = this.validConflict(doctor);
//
//	        if(!responseConflict.getErrors().isEmpty()) {
//				return responseConflict;
//			}
//	 }
	
		return new ResponseStatusDTO<>(null, errors, HttpStatus.OK);		
		
	}

}
