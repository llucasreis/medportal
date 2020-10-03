package br.com.medportal.modules.doctors.infra.hibernate.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.medportal.modules.doctors.infra.hibernate.entities.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, UUID> {

}
