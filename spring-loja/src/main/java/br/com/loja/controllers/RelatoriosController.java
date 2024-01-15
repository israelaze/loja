package br.com.loja.controllers;

import java.io.IOException;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

	@Operation(summary = "Gerar ranking de vendas por período")
	@GetMapping("/gerarRankingVendasPorPeriodo")
	public void gerarRankingVendasPeriodo(@Valid RelatorioFiltroDTO filtro, HttpServletResponse response) throws IOException {

		try {
			
			// Gerar o relatório a partir dos dados byte[]
			byte[] relatorioBytes = service.gerarRelatorioPeriodo(filtro);

			// Configurar a resposta HTTP para o navegador entender que é um arquivo PDF
			response.setContentType("application/pdf");
			response.setHeader("Content-Disposition", "attachment; filename=relatorio.pdf");

			// Escrever o relatório na resposta
			response.getOutputStream().write(relatorioBytes);
			response.getOutputStream().flush();
			response.getOutputStream().close();

		} catch (ServiceException | JRException | NumberFormatException e) {
			
			log.error("Erro:"+ e.getMessage());
			response.setStatus(HttpServletResponse.SC_NOT_FOUND);
			response.getWriter().write("Erro ao gerar o relatório: " +e.getMessage());
			response.getWriter().flush();
			response.getWriter().close();
			
		}
	}

}
