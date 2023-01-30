package br.com.loja.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.loja.dtos.auth.AuthGetDTO;
import br.com.loja.dtos.auth.AuthPostDTO;
import br.com.loja.exceptions.ServiceException;
import br.com.loja.services.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@CrossOrigin
@RestController
@AllArgsConstructor
@Tag(name = "Login")
@RequestMapping(value = "/api/auth")
public class AuthController {

	private final AuthService service;

	@PostMapping
	@Operation(summary = "autenticar")
	public ResponseEntity<AuthGetDTO> autenticar(@Valid @RequestBody AuthPostDTO dto) {

		try {
			AuthGetDTO getDto = service.autenticar(dto);
			return ResponseEntity.ok(getDto);

		} catch (ServiceException e) {
			return ResponseEntity.internalServerError().build();
		}
	}
}