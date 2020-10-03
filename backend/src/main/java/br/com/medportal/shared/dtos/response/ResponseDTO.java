package br.com.medportal.shared.dtos.response;

import java.util.List;

import br.com.medportal.shared.dtos.error.ErrorFieldDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResponseDTO<T> {
	
	private T content;
	private List<ErrorFieldDTO> errors;

}
