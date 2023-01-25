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

import br.com.loja.dtos.cliente.ClienteGetDTO;
import br.com.loja.dtos.cliente.ClientePostDTO;
import br.com.loja.dtos.cliente.ClientePutDTO;
import br.com.loja.exceptions.ServiceException;
import br.com.loja.services.ClienteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@CrossOrigin
@RestController
@AllArgsConstructor
@Tag(name = "Clientes")
@RequestMapping(value = "/api/clientes")
public class ClientesController {

	private final ClienteService service;

	@PostMapping
	@Operation(summary = "Cadastrar cliente")
	public ResponseEntity<ClienteGetDTO> cadastrar(@Valid @RequestBody ClientePostDTO dto) {

		try {
			ClienteGetDTO getDto = service.cadastrar(dto);
			return ResponseEntity.status(HttpStatus.CREATED).body(getDto);

		} catch (ServiceException | IllegalArgumentException | IllegalAccessException e) {
			return ResponseEntity.internalServerError().build();
		}
	}

	@GetMapping
	@Operation(summary = "Buscar clientes cadastrados")
	public ResponseEntity<List<ClienteGetDTO>> buscarClientes() {

		try {
			List<ClienteGetDTO> lista = service.buscarClientes();
			return ResponseEntity.status(HttpStatus.OK).body(lista);

		} catch (ServiceException e) {
			return ResponseEntity.internalServerError().build();
		}
	}

	@GetMapping("/{idCliente}")
	@Operation(summary = "Buscar cliente pelo Id")
	public ResponseEntity<ClienteGetDTO> buscarId(@PathVariable("idCliente") Integer idCliente) {

		try {
			ClienteGetDTO getDto = service.buscarId(idCliente);
			return ResponseEntity.ok(getDto);

		} catch (ServiceException e) {
			return ResponseEntity.internalServerError().build();
		}
	}

	@PutMapping
	@Operation(summary = "Atualizar cliente")
	public ResponseEntity<ClienteGetDTO> atualizar(@Valid @RequestBody ClientePutDTO dto) {

		try {
			ClienteGetDTO getDto = service.atualizar(dto);
			return ResponseEntity.ok(getDto);

		} catch (ServiceException e) {
			return ResponseEntity.internalServerError().build();
		}
	}

	@DeleteMapping("/{idCliente}")
	@Operation(summary = "Excluir cliente pelo Id")
	public ResponseEntity<String> excluir(@PathVariable Integer idCliente) {

		try {
			String response = service.excluir(idCliente);
			return ResponseEntity.ok(response);
			
		} catch (ServiceException e) {
			return ResponseEntity.internalServerError().body(e.getMessage());
		}
	}
	

}
