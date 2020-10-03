package br.com.medportal.modules.users.dtos.forms;

import javax.validation.constraints.NotBlank;

import br.com.medportal.modules.users.infra.hibernate.entities.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserFormDTO {
	
	@NotBlank
	private String name;
	
	@NotBlank
	private String email;
	
	@NotBlank
	private String password;
	
	public User convert() {
		return new User(this.name, this.email, this.password);
	}
}
