package br.com.loja.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.loja.dtos.endereco.EnderecoDTO;
import br.com.loja.exceptions.ServiceException;
import br.com.loja.services.EnderecoApiService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;

@CrossOrigin
@RestController
@AllArgsConstructor
@Tag(name = "Api externa")
@RequestMapping(value = "/api/cep")
public class EnderecoApiController {
	
	private final EnderecoApiService service;
	
	@GetMapping(value = "/{cep}")
	@Operation(summary = "Buscar endereço pelo cep na API externa")
	public ResponseEntity<EnderecoDTO> buscarEnderecoAPI(@PathVariable("cep") String cep) throws Exception{
		
		try {
		
			EnderecoDTO enderecoDto = service.buscarEnderecoAPI(cep);
			return ResponseEntity.ok(enderecoDto);
			
		} catch (ServiceException e) {
			return ResponseEntity.internalServerError().build();
		}	
	}

}
