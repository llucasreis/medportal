package br.com.medportal.modules.users.dtos.forms;

import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SessionFormDTO {
	
	@NotBlank
	private String email;
	
	@NotBlank
	private String password;

}
