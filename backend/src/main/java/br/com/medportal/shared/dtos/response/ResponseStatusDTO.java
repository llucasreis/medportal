package br.com.medportal.shared.dtos.response;

import java.util.List;

import org.springframework.http.HttpStatus;

import br.com.medportal.shared.dtos.error.ErrorFieldDTO;
import lombok.AllArgsConstructor;

import lombok.Setter;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResponseStatusDTO<T> {
	
	private T data;
    private List<ErrorFieldDTO> errors;
    private HttpStatus status;

}
