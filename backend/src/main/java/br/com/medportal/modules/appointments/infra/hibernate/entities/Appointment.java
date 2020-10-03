package br.com.medportal.modules.appointments.infra.hibernate.entities;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import br.com.medportal.modules.doctors.infra.hibernate.entities.Doctor;
import br.com.medportal.modules.users.infra.hibernate.entities.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "appointments")
public class Appointment {
	
	@Id
	@GeneratedValue(generator = "UUID")
	@GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
	@Column
	private UUID id;
	
	@Column
	private Date date;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "doctor_id")
	private Doctor doctor;
	
	@Column
	private LocalDateTime createdAt;
	
	@Column
	private LocalDateTime updatedAt;
	
	@PrePersist
	protected void prePersist() {
		if(this.createdAt == null) createdAt = LocalDateTime.now();
		if(this.updatedAt == null) updatedAt = LocalDateTime.now();
	}
	
	@PreUpdate
	protected void preUpdate() {
		this.updatedAt = LocalDateTime.now();
	}
	
	public Appointment(Date date, User user, Doctor doctor) {
		this.date = date;
		this.user = user;
		this.doctor = doctor;
	}
	
	

}
