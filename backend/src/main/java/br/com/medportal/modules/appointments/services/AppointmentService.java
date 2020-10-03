package br.com.medportal.modules.appointments.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import br.com.medportal.config.message.MessageService;
import br.com.medportal.modules.appointments.dtos.AppointmentDTO;
import br.com.medportal.modules.appointments.dtos.forms.AppointmentFormDTO;
import br.com.medportal.modules.appointments.infra.hibernate.entities.Appointment;
import br.com.medportal.modules.appointments.infra.hibernate.repositories.AppointmentRepository;
import br.com.medportal.modules.doctors.infra.hibernate.entities.Doctor;
import br.com.medportal.modules.doctors.infra.hibernate.repositories.DoctorRepository;
import br.com.medportal.modules.users.infra.hibernate.entities.User;
import br.com.medportal.modules.users.infra.hibernate.repositories.UserRepository;
import br.com.medportal.shared.dtos.error.ErrorFieldDTO;
import br.com.medportal.shared.dtos.response.ResponseStatusDTO;
import br.com.medportal.shared.enums.ValidServiceEnum;

@Service
public class AppointmentService {
	
	@Autowired
	private MessageService msg;
	
	@Autowired
	private AppointmentRepository repository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private DoctorRepository doctorRepository;
	
	public ResponseStatusDTO<AppointmentDTO> create(AppointmentFormDTO formDto) {
		Optional<User> opUser = userRepository.findById(UUID.fromString(formDto.getUserId()));
		Optional<Doctor> opDoctor = doctorRepository.findById(UUID.fromString(formDto.getDoctorId()));
		
		ResponseStatusDTO<AppointmentDTO> response = this.validAppointment(opUser, opDoctor, ValidServiceEnum.BOTH);
		
		if(response.getErrors().isEmpty()) {
			Appointment appointment = repository.save(
					formDto.convert(opUser.get(), opDoctor.get()));
			
			response.setData(new AppointmentDTO(appointment));
			
			response.setStatus(HttpStatus.CREATED);
		}
		
		return response;
	}
	
	private ResponseStatusDTO<AppointmentDTO> validAppointment(Optional<User> user, Optional<Doctor> doctor, ValidServiceEnum validService) {
		List<ErrorFieldDTO> errors = new ArrayList<ErrorFieldDTO>();
		
		if(validService.equals(ValidServiceEnum.BOTH) || validService.equals(ValidServiceEnum.NOT_FOUND)) {
		 ResponseStatusDTO<AppointmentDTO> responseNotFound = this.validNotFound(user, doctor);
		 
	        if(!responseNotFound.getErrors().isEmpty()) {
	 			return responseNotFound;
	 		}
		 }
		 
//		 if(validService.equals(ValidServiceEnum.BOTH) || validService.equals(ValidServiceEnum.CONFLICT)) {
//			 ResponseStatusDTO<UserDTO> responseConflict = this.validConflict(doctor);
//	
//		        if(!responseConflict.getErrors().isEmpty()) {
//					return responseConflict;
//				}
//		 }
	
		 return new ResponseStatusDTO<>(null, errors, HttpStatus.OK);
	}
	
	private ResponseStatusDTO<AppointmentDTO> validNotFound(Optional<User> user, Optional<Doctor> doctor) {
		List<ErrorFieldDTO> errors = new ArrayList<ErrorFieldDTO>();
		
		if(user != null && !user.isPresent()) {
			errors.add(new ErrorFieldDTO("userId", msg.get("userId.not.found")));
		}
		
		if(doctor != null && !doctor.isPresent()) {
			errors.add(new ErrorFieldDTO("doctorId", msg.get("doctorId.not.found")));
		}
		
		return new ResponseStatusDTO<AppointmentDTO>(null, errors, HttpStatus.NOT_FOUND);
	}

	public Page<Appointment> find(Pageable pagination) {
		Page<Appointment> appointments = repository.findAll(pagination);
		
		return appointments;
	}

}
