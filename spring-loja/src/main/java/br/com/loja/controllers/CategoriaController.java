package br.com.loja.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.loja.exceptions.ServiceException;
import br.com.loja.services.CategoriaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;

@CrossOrigin
@RestController
@AllArgsConstructor
@Tag(name = "categorias")
@RequestMapping(value = "/api/categorias")
public class CategoriaController {
	
	private final CategoriaService service;
	
	@GetMapping
	@Operation(summary = "Buscar categorias")
	public ResponseEntity<List<String>> buscarCategorias(){
		
		try {
			
			List<String> categorias = service.buscarCategorias();
			
			return ResponseEntity.ok(categorias);
			
		} catch (ServiceException e) {
			return ResponseEntity.internalServerError().build();
		}
	}

}
