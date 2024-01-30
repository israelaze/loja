package br.com.loja.controllers;

import java.io.IOException;
import java.util.List;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import br.com.loja.dtos.relatorios.RelatorioFiltroDTO;
import br.com.loja.exceptions.ServiceException;
import br.com.loja.services.RelatorioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.sf.jasperreports.engine.JRException;

@Slf4j
@CrossOrigin
@RestController
@AllArgsConstructor
@Tag(name = "Relatórios")
@RequestMapping(value = "/api/relatorios")
public class RelatoriosController {
	
	private final RelatorioService service;
    private final ObjectMapper mapper = new ObjectMapper();


	@Operation(summary = "Gerar ranking de vendas por período")
	@GetMapping(value="/gerarRankingVendasPeriodo")
	public ResponseEntity<String> gerarRankingVendasPeriodo(@Valid @RequestParam String  filtro) throws IOException {

		try {
			
			// convertendo os dadosdo cliente(String) em dto
			RelatorioFiltroDTO dto = mapper.readValue(filtro, RelatorioFiltroDTO.class);

			// Gerar o relatório a partir dos dados byte[]
            byte[] relatorioBytes = service.gerarRelatorioPeriodo(dto);

    	    log.info(">>>>>>>> VAI CONVERTER O PDF EM UMA STRING BASE64");
            String base64Pdf = "data:application/pdf;base64," + Base64.encodeBase64String(relatorioBytes);
            
            return new ResponseEntity<String>(base64Pdf, HttpStatus.OK);

		} catch (ServiceException | JRException | NumberFormatException e) {
			
		    log.error("Error: {}", e.getMessage(), e);
			return ResponseEntity.internalServerError().build();
			
		}
	}
	
	@GetMapping(value = "/tiposRelatorio")
	@Operation(summary = "Buscar tipos de relatório")
	public ResponseEntity<List<String>> buscarTiposRelatorio(){
		
		try {
			
			List<String> tipos = service.buscarTiposRelatorio();
			
			return ResponseEntity.ok(tipos);
			
		} catch (ServiceException e) {
			return ResponseEntity.internalServerError().build();
		}
	}

}
