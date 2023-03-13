package br.com.loja.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import br.com.loja.dtos.cliente.ClienteGetDTO;
import br.com.loja.dtos.cliente.ClientePostDTO;
import br.com.loja.dtos.cliente.ClientePutDTO;
import br.com.loja.exceptions.ServiceException;
import br.com.loja.services.ClienteService;
import br.com.loja.utils.ImagemUtils;
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
    private final ObjectMapper mapper = new ObjectMapper();

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	@Operation(summary = "Cadastrar cliente")
	public ResponseEntity<ClienteGetDTO> cadastrar(@Valid @RequestParam String dadosCliente, @RequestParam(value="file", required= false) MultipartFile file) {

		try {
			
			// convertendo os dadosdo cliente(String) em dto
			ClientePostDTO dto = mapper.readValue(dadosCliente, ClientePostDTO.class);
			
			// Redimensionando e setando a foto no dto
			if(file != null) {
				dto.setFoto(ImagemUtils.resizeMultipartFileToByteArray(file));
				//dto.setFoto(ImagemUtils.compressImage(file.getBytes()));

			}
			
			ClienteGetDTO getDto = service.cadastrar(dto);
			return ResponseEntity.status(HttpStatus.CREATED).body(getDto);

		} catch (ServiceException | IllegalArgumentException | IllegalAccessException | IOException e) {
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

	@PutMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	@Operation(summary = "Atualizar cliente")
	public ResponseEntity<ClienteGetDTO> atualizar(@Valid @RequestParam String dadosCliente, @RequestParam(value="file", required= false) MultipartFile file) {

		try {
			
			// convertendo os dadosdo cliente(String) em dto
			ClientePutDTO dto = mapper.readValue(dadosCliente, ClientePutDTO.class);
			
			// Redimensionando e setando a foto no dto
			if(file != null) {
				dto.setFoto(ImagemUtils.resizeMultipartFileToByteArray(file));
				//dto.setFoto(ImagemUtils.compressImage(file.getBytes()));


			}
			
			ClienteGetDTO getDto = service.atualizar(dto);
			return ResponseEntity.ok(getDto);

		} catch (ServiceException | IOException e) {
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
