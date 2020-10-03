package br.com.medportal.modules.doctors.dtos.forms;

import javax.validation.constraints.NotBlank;

import br.com.medportal.modules.doctors.infra.hibernate.entities.Doctor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DoctorFormDTO {
	
	@NotBlank
	private String name;
	
	@NotBlank
	private String crm;
	
	@NotBlank
	private String number;
	
	@NotBlank
	private String city;
	
	@NotBlank
	private String state;
	
	@NotBlank
	private String specialty;
	
	public Doctor convert() {
		return new Doctor(this.name, this.crm, this.number,
				this.city, this.state, this.specialty);
	}

}
