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

import br.com.loja.dtos.produto.ProdutoGetDTO;
import br.com.loja.dtos.produto.ProdutoPostDTO;
import br.com.loja.dtos.produto.ProdutoPutDTO;
import br.com.loja.exceptions.ServiceException;
import br.com.loja.services.ProdutoService;
import br.com.loja.utils.ImagemUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin
@RestController
@AllArgsConstructor
@Tag(name = "Produtos")
@RequestMapping(value = "/api/produtos")
public class ProdutosController {

	private final ProdutoService service;
    private final ObjectMapper mapper = new ObjectMapper();


	@PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE})
	@Operation(summary = "Cadastrar produto")
	public ResponseEntity<ProdutoGetDTO> cadastrar(@Valid @RequestParam String dadosProduto, @RequestParam(value= "file", required = false) MultipartFile file) {

		try {
		
			// convertendo os dadosdo produto(String) em dto
			ProdutoPostDTO dto = mapper.readValue(dadosProduto, ProdutoPostDTO.class);
			
			// Redimensionando e setando a foto no dto
			if(file != null && !file.isEmpty()) {
				
				if(file.getContentType().equals("image/png")) {
					
					dto.setFoto(ImagemUtils.resizeMultipartFileToByteArrayPng(file));
				}else {
					
					dto.setFoto(ImagemUtils.resizeMultipartFileToByteArray(file));
					//dto.setFoto(ImagemUtils.compressImage(file.getBytes()));
				}
			}

			ProdutoGetDTO getDto = service.cadastrar(dto);
			
			return ResponseEntity.status(HttpStatus.CREATED).body(getDto);

		} catch (ServiceException | IllegalArgumentException | IOException e) {
			log.error("ERRO:", e);
			return ResponseEntity.internalServerError().build();
		}
	}

	@GetMapping
	@Operation(summary = "Buscar produtos cadastrados")
	public ResponseEntity<List<ProdutoGetDTO>> buscarProdutos() {

		try {
			List<ProdutoGetDTO> lista = service.buscarProdutos();
			return ResponseEntity.status(HttpStatus.OK).body(lista);

		} catch (ServiceException e) {
			log.error("ERRO:", e);
			return ResponseEntity.internalServerError().build();
		}
	}

	@GetMapping("/{idProduto}")
	@Operation(summary = "Buscar produto pelo Id")
	public ResponseEntity<ProdutoGetDTO> buscarId(@PathVariable("idProduto") Integer idProduto) {

		try {
			ProdutoGetDTO getDto = service.buscarId(idProduto);
			return ResponseEntity.ok(getDto);

		} catch (ServiceException e) {
			log.error("ERRO:", e);
			return ResponseEntity.internalServerError().build();
		}
	}

	@PutMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	@Operation(summary = "Atualizar produto")
	public ResponseEntity<ProdutoGetDTO> atualizar(@Valid @RequestParam String dadosProduto, @RequestParam(value= "file", required = false) MultipartFile file) {

		try {
			
			// convertendo os dadosdo produto(String) em dto
			ProdutoPutDTO dto = mapper.readValue(dadosProduto, ProdutoPutDTO.class);
			
			// Redimensionando e setando a foto no dto
			if(file != null && !file.isEmpty()) {
				dto.setFoto(ImagemUtils.resizeMultipartFileToByteArray(file));
				//dto.setFoto(ImagemUtils.compressImage(file.getBytes()));
			}
			
			ProdutoGetDTO getDto = service.atualizar(dto);
			return ResponseEntity.ok(getDto);

		} catch (ServiceException | IOException e) {
			log.error("ERRO:", e);
			return ResponseEntity.internalServerError().build();
		}
	}

	@DeleteMapping("/{idProduto}")
	@Operation(summary = "Excluir produto pelo Id")
	public ResponseEntity<String> excluir(@PathVariable Integer idProduto) {

		try {
			String response = service.excluir(idProduto);
			return ResponseEntity.ok(response);
			
		} catch (ServiceException e) {
			log.error("ERRO:", e);
			return ResponseEntity.internalServerError().body(e.getMessage());
		}
	}

}
