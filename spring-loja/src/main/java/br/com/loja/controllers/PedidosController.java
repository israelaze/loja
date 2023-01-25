package br.com.loja.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.loja.dtos.pedido.PedidoGetDTO;
import br.com.loja.dtos.pedido.PedidoPostDTO;
import br.com.loja.dtos.pedido.PedidoPutDTO;
import br.com.loja.exceptions.ServiceException;
import br.com.loja.services.PedidoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin
@RestController
@AllArgsConstructor
@Tag(name = "Pedidos")
@RequestMapping(value = "/api/pedidos")
public class PedidosController {

	private final PedidoService service;

	@PostMapping
	@Operation(summary = "Cadastrar pedido")
	public ResponseEntity<PedidoGetDTO> cadastrar(@Valid @RequestBody PedidoPostDTO dto) {

		try {
			PedidoGetDTO getDto = service.cadastrar(dto);
			return ResponseEntity.status(HttpStatus.CREATED).body(getDto);

		} catch (ServiceException e) {
			return ResponseEntity.internalServerError().build();
		}
	}

	@GetMapping
	@Operation(summary = "Buscar pedidos cadastrados")
	public ResponseEntity<List<PedidoGetDTO>> buscarPedidos() {

		try {
			List<PedidoGetDTO> lista = service.buscarPedidos();
			return ResponseEntity.status(HttpStatus.OK).body(lista);

		} catch (ServiceException e) {
			log.error("ERRO:", e);
			return ResponseEntity.internalServerError().build();
		}
	}

	@GetMapping("/{idPedido}")
	@Operation(summary = "Buscar pedido pelo Id")
	public ResponseEntity<PedidoGetDTO> buscarId(@PathVariable("idPedido") Integer idPedido) {

		try {
			PedidoGetDTO getDto = service.buscarId(idPedido);
			return ResponseEntity.ok(getDto);

		} catch (ServiceException e) {
			return ResponseEntity.internalServerError().build();
		}
	}

	@PatchMapping("/{idPedido}")
	@Operation(summary = "Cancelar pedido pelo Id")
	public ResponseEntity<String> cancelar(@PathVariable Integer idPedido) {

		try {
			String response = service.cancelar(idPedido);
			return ResponseEntity.ok(response);
			
		} catch (ServiceException e) {
			return ResponseEntity.internalServerError().body(e.getMessage());
		}
	}
	
	@PutMapping
	@Operation(summary = "Atualizar pedido pelo Id")
	public ResponseEntity<PedidoGetDTO> atualizar(@Valid @RequestBody PedidoPutDTO dto) {

		try {
			PedidoGetDTO getDto = service.atualizar(dto);
			return ResponseEntity.ok(getDto);
			
		} catch (ServiceException e) {
			return ResponseEntity.internalServerError().build();
		}
	}

}
