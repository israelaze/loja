package br.com.loja.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.loja.dtos.fornecedor.FornecedorGetDTO;
import br.com.loja.dtos.fornecedor.FornecedorPostDTO;
import br.com.loja.dtos.fornecedor.FornecedorPutDTO;
import br.com.loja.exceptions.ServiceException;
import br.com.loja.services.FornecedorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;

@CrossOrigin
@Validated
@RestController
@AllArgsConstructor
@Tag(name = "Fornecedores")
@RequestMapping(value = "/api/fornecedores")
public class FornecedoresController {

	private final FornecedorService service;

	@PostMapping
	@Operation(summary = "Cadastrar fornecedor")
	public ResponseEntity<FornecedorGetDTO> cadastrar(@RequestBody @Valid @NotNull FornecedorPostDTO dto) {

		try {
			FornecedorGetDTO getDto = service.cadastrar(dto);
			return ResponseEntity.status(HttpStatus.CREATED).body(getDto);

		} catch (ServiceException e) {
			return ResponseEntity.internalServerError().build();
		}
	}

	@GetMapping
	@Operation(summary = "Buscar fornecedores cadastrados")
	public ResponseEntity<List<FornecedorGetDTO>> buscarFornecedores() {

		try {
			List<FornecedorGetDTO> lista = service.buscarFornecedores();
			return ResponseEntity.status(HttpStatus.OK).body(lista);

		} catch (ServiceException e) {
			return ResponseEntity.internalServerError().build();
		}
	}
	
	@GetMapping("/{idFornecedor}")
	@Operation(summary = "Buscar fornecedor pelo Id")
	public ResponseEntity<FornecedorGetDTO> buscarId(@PathVariable("idFornecedor") Integer idFornecedor) {

		try {
			FornecedorGetDTO getDto = service.buscarId(idFornecedor);
			return ResponseEntity.ok(getDto);

		} catch (ServiceException e) {
			return ResponseEntity.internalServerError().build();
		}
	}

	@PutMapping
	@Operation(summary = "Atualizar fornecedor")
	public ResponseEntity<FornecedorGetDTO> atualizar(@Valid @RequestBody FornecedorPutDTO dto) {

		try {
			FornecedorGetDTO getDto = service.atualizar(dto);
			return ResponseEntity.ok(getDto);

		} catch (ServiceException e) {
			return ResponseEntity.internalServerError().build();
		}
	}

	@DeleteMapping("/{idFornecedor}")
	@Operation(summary = "Excluir fornecedor pelo Id")
	public ResponseEntity<String> excluir(@PathVariable Integer idFornecedor) {

		try {
			String response = service.excluir(idFornecedor);
			return ResponseEntity.ok(response);
			
		} catch (ServiceException e) {
			return ResponseEntity.internalServerError().body(e.getMessage());
		}
	}

}
