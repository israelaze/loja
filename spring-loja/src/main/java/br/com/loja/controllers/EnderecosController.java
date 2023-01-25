package br.com.loja.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.loja.dtos.endereco.EnderecoDTO;
import br.com.loja.exceptions.ServiceException;
import br.com.loja.services.EnderecoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;

@CrossOrigin
@RestController
@AllArgsConstructor
@Tag(name = "Endereços")
@RequestMapping(value = "/api/enderecos")
public class EnderecosController {

	private final EnderecoService service;

	@GetMapping
	@Operation(summary = "Buscar endereços cadastrados")
	public ResponseEntity<List<EnderecoDTO>> buscarEnderecos() {

		try {
			List<EnderecoDTO> lista = service.buscarEnderecos();
			return ResponseEntity.ok(lista);
		} catch (ServiceException e) {
			return ResponseEntity.internalServerError().build();
		}
	}

	@GetMapping(value = "/{idEndereco}")
	@Operation(summary = "Buscar endereço pelo Id")
	public ResponseEntity<EnderecoDTO> buscarId(@PathVariable("idEndereco") Integer idEndereco) {

		try {
			EnderecoDTO getDto = service.buscarId(idEndereco);
			return ResponseEntity.ok(getDto);
		} catch (ServiceException e) {
			return ResponseEntity.internalServerError().build();
		}
	}	

}