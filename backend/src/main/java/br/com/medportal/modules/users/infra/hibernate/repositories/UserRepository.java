package br.com.medportal.modules.users.infra.hibernate.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.medportal.modules.users.infra.hibernate.entities.User;


public interface UserRepository extends JpaRepository<User, UUID> {

	Optional<User> findByEmail(String email);

	Optional<User> findById(UUID id);

}
