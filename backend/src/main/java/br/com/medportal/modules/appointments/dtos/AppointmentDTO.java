package br.com.medportal.modules.appointments.dtos;

import java.util.Date;
import java.util.UUID;

import org.springframework.data.domain.Page;

import com.fasterxml.jackson.annotation.JsonFormat;

import br.com.medportal.modules.appointments.infra.hibernate.entities.Appointment;
import br.com.medportal.modules.doctors.dtos.DoctorDTO;
import br.com.medportal.modules.users.dtos.UserDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AppointmentDTO {
	
	private UUID id;
	
	@JsonFormat(pattern="dd/MM/yyyy")
	private Date date;
	
	private UserDTO user;
	
	private DoctorDTO doctor;
	
	public AppointmentDTO(Appointment appointment) {
		this.id = appointment.getId();
		this.date = appointment.getDate();
		this.user = new UserDTO(appointment.getUser());
		this.doctor = new DoctorDTO(appointment.getDoctor());
	}
	
	public static Page<AppointmentDTO> convert(Page<Appointment> appointments) {
		return appointments.map(AppointmentDTO::new);
	}
	
	

}
