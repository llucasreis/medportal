package br.com.medportal.modules.appointments.dtos.forms;

import java.util.Date;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonFormat;

import br.com.medportal.modules.appointments.infra.hibernate.entities.Appointment;
import br.com.medportal.modules.doctors.infra.hibernate.entities.Doctor;
import br.com.medportal.modules.users.infra.hibernate.entities.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AppointmentFormDTO {
	
	@NotNull
	@JsonFormat(pattern	= "yyyy-MM-dd")
	private Date date;
	
	@NotBlank
	private String userId;
	
	@NotBlank
	private String doctorId;
	
	public Appointment convert(User user, Doctor doctor) {
		return new Appointment(this.date, user, doctor);
	}

}
