package br.com.loja.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.loja.exceptions.ServiceException;
import br.com.loja.services.EstadosService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;

@CrossOrigin
@RestController
@AllArgsConstructor
@Tag(name = "Estados")
@RequestMapping(value = "/api/estados")
public class EstadosController {
	
	private final EstadosService service;
	
	@GetMapping
	@Operation(summary = "Buscar estados")
	public ResponseEntity<List<String>> buscarTodos(){
		
		try {
			List<String> lista = service.buscarTodos();
			return ResponseEntity.ok(lista);
			
		} catch (ServiceException e) {
			return ResponseEntity.internalServerError().build();
		}
	}

}
