package br.com.loja.controllers;

import java.io.IOException;

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
	@GetMapping(value="/gerarRankingVendasPeriodo", produces = "application/text")
	public ResponseEntity<String> gerarRankingVendasPeriodo(@Valid @RequestParam String  filtro) throws IOException {

		try {
			
			// convertendo os dadosdo cliente(String) em dto
			RelatorioFiltroDTO dto = mapper.readValue(filtro, RelatorioFiltroDTO.class);

			// Gerar o relatório a partir dos dados byte[]
            byte[] relatorioBytes = service.gerarRelatorioPeriodo(dto);

            // Configurar o cabeçalho HTTP para o navegador entender que é um arquivo PDF
          //  HttpHeaders headers = new HttpHeaders();
         //   headers.setContentType(MediaType.APPLICATION_PDF);
       //     headers.setContentDisposition(ContentDisposition.builder("attachment").filename("relatorio.pdf").build());
//            headers.setContentLength(relatorioBytes.length);
//            headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
//            headers.setPragma("public");
//            headers.setExpires(0L);
       //     headers.setAccept(Collections.singletonList(MediaType.APPLICATION_PDF));

            String base64Pdf = "data:application/pdf;base64," + Base64.encodeBase64String(relatorioBytes);
            
            return new ResponseEntity<String>(base64Pdf, HttpStatus.OK);

		} catch (ServiceException | JRException | NumberFormatException e) {
			
		    log.error("Error: {}", e.getMessage(), e);
			return ResponseEntity.internalServerError().build();
			
		}
	}

}
