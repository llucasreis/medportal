package br.com.medportal.shared.dtos.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ErrorFieldDTO {
	
	private String field;
	private String error;

}
