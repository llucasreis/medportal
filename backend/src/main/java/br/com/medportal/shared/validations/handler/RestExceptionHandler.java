package br.com.medportal.shared.validations.handler;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import br.com.medportal.shared.dtos.error.ErrorFieldDTO;
import br.com.medportal.shared.dtos.error.ErrorsDTO;


@RestControllerAdvice
public class RestExceptionHandler {
	
	@Autowired
    private MessageSource messageSource;
	
	@ResponseStatus(code = HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ErrorsDTO<ErrorFieldDTO> handleMethodArgumentNotValid(MethodArgumentNotValidException exception) {
        List<ErrorFieldDTO> dto = new ArrayList<>();
        List<FieldError> fieldErrors = exception.getBindingResult().getFieldErrors();

        fieldErrors.forEach(e -> {
            String message = messageSource.getMessage(e, LocaleContextHolder.getLocale());
            ErrorFieldDTO error = new ErrorFieldDTO(e.getField(), "Campo " + message);
            dto.add(error);
        });

        return new ErrorsDTO<ErrorFieldDTO>(dto);
    }
}
