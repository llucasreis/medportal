package br.com.medportal.modules.doctors.dtos;

import java.util.UUID;

import org.springframework.data.domain.Page;

import br.com.medportal.modules.doctors.infra.hibernate.entities.Doctor;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class DoctorDTO {
	
	private UUID id;
	private String name;
	private String crm;
	private String number;
	private String city;
	private String state;
	private String specialty;
	
	public DoctorDTO(Doctor doctor) {
		this.id = doctor.getId();
		this.name = doctor.getName();
		this.crm = doctor.getCrm();
		this.number = doctor.getNumber();
		this.city = doctor.getCity();
		this.state = doctor.getState();
		this.specialty = doctor.getSpecialty();
	}
	
	public static Page<DoctorDTO> convert(Page<Doctor> doctors) {
		return doctors.map(DoctorDTO::new);
	}

}
