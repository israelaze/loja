package br.com.loja.services;

import java.io.InputStream;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.loja.dtos.cliente.ClienteGetDTO;
import br.com.loja.dtos.pedido.PedidoGetDTO;
import br.com.loja.dtos.relatorios.RelatorioFiltroDTO;
import br.com.loja.dtos.relatorios.RelatorioGetDTO;
import br.com.loja.entities.Cliente;
import br.com.loja.entities.Produto;
import br.com.loja.enums.TipoRelatorio;
import br.com.loja.exceptions.EntityNotFoundException;
import br.com.loja.repositories.ClienteRepository;
import br.com.loja.repositories.ProdutoRepository;
import br.com.loja.repositories.RelatoriosRepository;
import br.com.loja.utils.DateUtils;
import br.com.loja.utils.Validacoes;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class RelatorioService {

	private final RelatoriosRepository relatoriosRepository;
	private final ProdutoRepository produtoRepository;
	private final ClienteRepository clienteRepository;
	private final PedidoService pedidoService;

	public byte[] gerarRelatorioPeriodo(RelatorioFiltroDTO filtro) throws JRException {
	
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		
		String dataInicio = filtro.getDataInicio();
		String dataFim = filtro.getDataFim();
		
		if(Validacoes.isEmpty(dataInicio)) {
			dataInicio = buscarDataPrimeiroPedidoCadastrado();			
		}
		
		if(Validacoes.isEmpty(dataFim)) {
			dataFim = DateUtils.toString(new Date());
		}
		
		// Adicionando parâmetros
		Map<String, Object> parametros = new HashMap<>();
		parametros.put("dataInicio", sdf.format(DateUtils.toDate(dataInicio)));
		parametros.put("dataFim", sdf.format(DateUtils.toDate(dataFim)));
		parametros.put("dataHoje", DateUtils.toStringPtBRHora(new Date()).toString());
        parametros.put("caminhoImagem", "relatorios/imagens/relatorio.png");
	
		List<RelatorioGetDTO> dados = null;
		String caminhoArquivoTemplate = null;
		
		if(filtro.getTipoRelatorio().equals("PRODUTO")) {
			dados = buscarRankigProdutosPorPeriodo(dataInicio, dataFim);
			caminhoArquivoTemplate = "/relatorios/relatorioRankingProdutoPeriodo.jrxml";
			
		}else if(filtro.getTipoRelatorio().equals("CLIENTE")) {
			dados = buscarRankingClientesPorPeriodo(dataInicio, dataFim);
			caminhoArquivoTemplate = "/relatorios/relatorioRankingClientePeriodo.jrxml";
		}
				
		byte[] pdf = gerarRelatorioPDF(dados, caminhoArquivoTemplate, parametros);
		
		return pdf;
	}
	
	public List<String> buscarTiposRelatorio() {
		// Consultando todos os tipos de relatório
		List<String> tipos = Stream.of(TipoRelatorio.values())
				.map(TipoRelatorio::name)
				.collect(Collectors.toList());
		
		return tipos;
	}
	
	private String buscarDataPrimeiroPedidoCadastrado() {
		
		PedidoGetDTO pedido = pedidoService.buscarPrimeiroPedidoCadastrado();
		
		if(pedido != null) {
			String data = pedido.getDataPedido();
			
			return data;
		}
		
		throw new EntityNotFoundException("Ainda não existem pedidos cadastrados.");
	}
	
	private List<RelatorioGetDTO> buscarRankigProdutosPorPeriodo(String dataInicio, String dataFim) {

		Date inicio = DateUtils.toDate(dataInicio);
		Date fim = DateUtils.toDate(dataFim);
		
		List<Object[]> result = relatoriosRepository.buscarRankigProdutosPorPeriodo(inicio, fim);
		
		List<RelatorioGetDTO> lista = new ArrayList<RelatorioGetDTO>();

		if (!Validacoes.isEmpty(result)) {

			for (Object[] dto : result) {

				Integer idProduto = (Integer) dto[0];
				Number totalVendidosNumber = (Number) dto[1];
				
				//convertendo um NUMBER para BigDecimal
			    BigDecimal totalVendidos = new BigDecimal(totalVendidosNumber.doubleValue());

				if (idProduto != null && totalVendidos.compareTo(BigDecimal.ZERO) != 0) {

					Optional<Produto> produto = produtoRepository.findById(idProduto);

					// Verifica se o Optional contém um valor antes de acessá-lo
					produto.ifPresent(p -> {

						RelatorioGetDTO item = new RelatorioGetDTO();
					
						item.setCodigoProduto(p.getCodigo());
						item.setNomeProduto(p.getNomeProduto());
						item.setCategoria(p.getCategoria().toString());
						item.setNomeFornecedor(p.getFornecedor().getNomeFornecedor());
						item.setTotalVendidos(totalVendidos);
						item.setValorTotal(totalVendidos.multiply(new BigDecimal(p.getValorVenda())));

						lista.add(item);
					});
				}
			}

		} else {
    	    log.info(">>>>>>> NÃO É POSSÍVEL GERAR O RELATÓRIO POR FALTA DE PEDIDOS NO PERÍODO INFORMADO");

			throw new EntityNotFoundException("Não há pedidos no período informado.");
		}
		return lista;
	}
	
	private List<RelatorioGetDTO> buscarRankingClientesPorPeriodo(String dataInicio, String dataFim) {
		
		Date inicio = DateUtils.toDate(dataInicio);
		Date fim = DateUtils.toDate(dataFim);
		
		//List<Object[]> result = relatoriosRepository.buscarRankingClientesPorPeriodo(inicio, fim);
		List<Object[]> result = relatoriosRepository.buscarRankingClientesPorPeriodo(inicio, fim);
		
		List<RelatorioGetDTO> lista = new ArrayList<RelatorioGetDTO>();

		if (!Validacoes.isEmpty(result)) {

			for (Object[] dto : result) {

				Integer idCliente = (Integer) dto[0];
				Number totalPedidosNumber = (Number) dto[1];
				
				//convertendo um NUMBER para BigDecimal
			    BigDecimal totalPedidos = new BigDecimal(totalPedidosNumber.doubleValue());

				if (idCliente != null && totalPedidos.compareTo(BigDecimal.ZERO) != 0) {

					Optional<Cliente> cliente = clienteRepository.findById(idCliente);

					// Verifica se o Optional contém um valor antes de acessá-lo
					cliente.ifPresent(p -> {

						RelatorioGetDTO item = new RelatorioGetDTO();
			
						item.setCliente(new ClienteGetDTO(cliente.get()));
						item.setTotalPedidos(totalPedidos);
						lista.add(item);
					});
				}
			}

		} else {
    	    log.info(">>>>>>> NÃO É POSSÍVEL GERAR O RELATÓRIO POR FALTA DE PEDIDOS NO PERÍODO INFORMADO");

			throw new EntityNotFoundException("Não há pedidos no período informado.");
		}
		return lista;
	}

	private byte[] gerarRelatorioPDF(List<RelatorioGetDTO> dados, String caminhoArquivoTemplate, Map<String, Object> parametros) throws JRException{
		
		log.info(">>>>>>>> VAI CRIAR A FONTE DE DADOS");
		JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(dados);
		
	    log.info(">>>>>>>> VAI CARREGAR O ARQUIVO JRXML");
		InputStream jasperStream = getClass().getResourceAsStream(caminhoArquivoTemplate);

	    log.info(">>>>>>>> VAI COMPILAR");
		// Compile o JRXML em um objeto JasperReport
		JasperReport jasperReport = JasperCompileManager.compileReport(jasperStream);
		
	    log.info(">>>>>>>> VAI PREENCHER OS RELATÓRIOS COM OS DADOS FORNECIDOS");
		JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parametros, dataSource);

	    log.info(">>>>>>>> VAI EXPORTAR O PDF");
		return JasperExportManager.exportReportToPdf(jasperPrint);
	}

	
	

}
