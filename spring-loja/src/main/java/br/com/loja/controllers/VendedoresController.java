package br.com.loja.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.loja.dtos.vendedor.VendedorGetDTO;
import br.com.loja.dtos.vendedor.VendedorPostDTO;
import br.com.loja.dtos.vendedor.VendedorPutDTO;
import br.com.loja.exceptions.ServiceException;
import br.com.loja.services.VendedorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;


@CrossOrigin
@RestController
@AllArgsConstructor
@Tag(name = "Vendedores")
@RequestMapping(value = "/api/vendedores")
public class VendedoresController {

	private final VendedorService service;

	@PostMapping
	@Operation(summary = "Cadastrar vendedores")
	public ResponseEntity<VendedorGetDTO> cadastrar(@Valid @RequestBody VendedorPostDTO dto) {

		try {
			VendedorGetDTO getDto = service.cadastrar(dto);
			return ResponseEntity.status(HttpStatus.CREATED).body(getDto);

		} catch (ServiceException e) {
			return ResponseEntity.internalServerError().build();
		}
	}

	@GetMapping
	@Operation(summary = "Buscar vendedores cadastrados")
	public ResponseEntity<List<VendedorGetDTO>> buscarVendedors() {

		try {
			List<VendedorGetDTO> lista = service.buscarVendedors();
			return ResponseEntity.status(HttpStatus.OK).body(lista);

		} catch (ServiceException e) {
			return ResponseEntity.internalServerError().build();
		}
	}

	@GetMapping("/{idVendedor}")
	@Operation(summary = "Buscar vendedor pelo Id")
	public ResponseEntity<VendedorGetDTO> buscarId(@PathVariable("idVendedor") Integer idVendedor) {

		try {
			VendedorGetDTO getDto = service.buscarId(idVendedor);
			return ResponseEntity.ok(getDto);

		} catch (ServiceException e) {
			return ResponseEntity.internalServerError().build();
		}
	}

	@PutMapping
	@Operation(summary = "Atualizar vendedor")
	public ResponseEntity<VendedorGetDTO> atualizar(@Valid @RequestBody VendedorPutDTO dto) {

		try {
			VendedorGetDTO getDto = service.atualizar(dto);
			return ResponseEntity.ok(getDto);

		} catch (ServiceException e) {
			return ResponseEntity.internalServerError().build();
		}
	}

	@DeleteMapping("/{idVendedor}")
	@Operation(summary = "Excluir vendedor pelo Id")
	public ResponseEntity<String> excluir(@PathVariable Integer idVendedor) {

		try {
			String response = service.excluir(idVendedor);
			return ResponseEntity.ok(response);
			
		} catch (ServiceException e) {
			return ResponseEntity.internalServerError().body(e.getMessage());
		}
	}

}
