package br.com.medportal.modules.doctors.infra.hibernate.entities;

import java.time.LocalDateTime;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "doctors")
public class Doctor {
	
	@Id
	@GeneratedValue(generator = "UUID")
	@GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
	@Column
	private UUID id;
	
	@Column
	private String name;
	
	@Column
	private String crm;
	
	@Column
	private String number;
	
	@Column
	private String city;
	
	@Column
	private String state;
	
	@Column
	private String specialty;
	
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
	
	public Doctor(String name, String crm, String number,
			String city, String state, String specialty) {
		this.name = name;
		this.crm = crm;
		this.number = number;
		this.city = city;
		this.state = state;
		this.specialty = specialty;
	}

}
