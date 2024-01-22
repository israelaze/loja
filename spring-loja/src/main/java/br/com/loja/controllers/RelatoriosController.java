package br.com.loja.controllers;

import java.io.IOException;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import br.com.loja.dtos.relatorios.RelatorioFiltroDTO;
import br.com.loja.exceptions.ServiceException;
import br.com.loja.services.RelatorioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
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
	@PostMapping("/gerarRankingVendasPeriodo")
	public ResponseEntity<ByteArrayResource> gerarRankingVendasPeriodo(@Valid @RequestParam String  filtro, HttpServletResponse response) throws IOException {

		try {
			
			// convertendo os dadosdo cliente(String) em dto
			RelatorioFiltroDTO dto = mapper.readValue(filtro, RelatorioFiltroDTO.class);

			// Gerar o relatório a partir dos dados byte[]
            byte[] relatorioBytes = service.gerarRelatorioPeriodo(dto);

            // Configurar o cabeçalho HTTP para o navegador entender que é um arquivo PDF
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", "relatorio.pdf");
            headers.setContentLength(Long.valueOf(relatorioBytes.length));

            // Retornar uma ResponseEntity com o corpo do relatório e cabeçalhos configurados
            return ResponseEntity.ok().headers(headers).body(new ByteArrayResource(relatorioBytes));

		} catch (ServiceException | JRException | NumberFormatException e) {
			
			log.error("Erro:"+ e.getMessage());
			return ResponseEntity.internalServerError().build();
			
		}
	}

}
