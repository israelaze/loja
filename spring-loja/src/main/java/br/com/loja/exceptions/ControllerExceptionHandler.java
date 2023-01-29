package br.com.loja.exceptions;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class ControllerExceptionHandler {

	// Status code 500
	@ExceptionHandler(ServiceException.class)
	public ResponseEntity<StandardError> exception(Exception e, HttpServletRequest request) {

		Integer status = HttpStatus.INTERNAL_SERVER_ERROR.value();
		String error = "ERRO";

		StandardError standardError = new StandardError(Instant.now(), status, error, e.getMessage(),
				request.getRequestURI());
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(standardError);
	}

	// Status code 400
	@ExceptionHandler(BadRequestException.class)
	public ResponseEntity<StandardError> badRequest(BadRequestException e, HttpServletRequest request) {

		Integer status = HttpStatus.BAD_REQUEST.value();
		String error = "ERRO";

		StandardError standardError = new StandardError(Instant.now(), status, error, e.getMessage(),
				request.getRequestURI());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(standardError);
	}

	// Status code 404
	@ExceptionHandler(EntityNotFoundException.class)
	public ResponseEntity<StandardError> entityNotFound(EntityNotFoundException e, HttpServletRequest request) {

		Integer status = HttpStatus.NOT_FOUND.value();
		String error = "ERRO";

		StandardError standardError = new StandardError(Instant.now(), status, error, e.getMessage(),
				request.getRequestURI());
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(standardError);
	}

	// Status code 409
	@ExceptionHandler(ConstraintViolationException.class)
	public ResponseEntity<StandardError> constraint(ConstraintViolationException e, HttpServletRequest request) {

		Integer status = HttpStatus.CONFLICT.value();
		String error = "ERRO";

		StandardError standardError = new StandardError(Instant.now(), status, error, e.getMessage(),
				request.getRequestURI());
		return ResponseEntity.status(HttpStatus.CONFLICT).body(standardError);
	}

	// Erros de validação
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleValidationErrors(MethodArgumentNotValidException ex) {
    	
    	HttpStatus status = HttpStatus.BAD_REQUEST;
    	
    	System.out.println(ex);

		List<ErrorObject> errors = getErrors(ex);
		ValidationError validationError = getValidationError(ex, status, errors);
		
    	System.out.println(validationError.getMessage());

		
        return new ResponseEntity<>(validationError, status);  
        
    }	
    
    private List<ErrorObject> getErrors(MethodArgumentNotValidException ex) {
		return ex.getBindingResult().getFieldErrors().stream()
				.map(error -> new ErrorObject(error.getDefaultMessage(), error.getField(), error.getRejectedValue()))
				.collect(Collectors.toList());
	}
    
    private ValidationError getValidationError(MethodArgumentNotValidException ex, HttpStatus status,
			List<ErrorObject> errors) {

		String message = "Requisição possui campos inválidos";
		int code = status.value();
		String error = status.getReasonPhrase();
		String objectName = ex.getBindingResult().getObjectName();

		return new ValidationError(message, code, error, objectName, errors);
	}

	
}
