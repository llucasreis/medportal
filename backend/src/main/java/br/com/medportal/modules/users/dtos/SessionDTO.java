package br.com.medportal.modules.users.dtos;

import java.util.UUID;

import br.com.medportal.modules.users.infra.hibernate.entities.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SessionDTO {
	
	private UserDTO user;
	private String token;
	
	public SessionDTO(User user, String token) {
		this.user = new UserDTO(user);
		this.token = token;
	}

}
