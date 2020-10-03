package br.com.medportal.modules.appointments.infra.hibernate.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.medportal.modules.appointments.infra.hibernate.entities.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, UUID> {

}
