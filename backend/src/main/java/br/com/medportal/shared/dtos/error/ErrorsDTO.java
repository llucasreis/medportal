package br.com.medportal.shared.dtos.error;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ErrorsDTO<T> {
	
	private List<T> errors;

}
