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

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.loja.dtos.pedido.PedidoGetDTO;
import br.com.loja.dtos.relatorios.RankingVendasDTO;
import br.com.loja.dtos.relatorios.RelatorioFiltroDTO;
import br.com.loja.entities.Produto;
import br.com.loja.exceptions.EntityNotFoundException;
import br.com.loja.repositories.ProdutoRepository;
import br.com.loja.repositories.RelatoriosRepository;
import br.com.loja.utils.DateUtils;
import br.com.loja.utils.Validacoes;
import lombok.AllArgsConstructor;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@Service
@Transactional
@AllArgsConstructor
public class RelatorioService {

	private final RelatoriosRepository relatoriosRepository;
	private final ProdutoRepository produtoRepository;
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
	
		// Buscar o ranking de vendas
		List<RankingVendasDTO> dados = buscarRankigProdutosPorPeriodo(dataInicio, dataFim);

		// Preencha o relatório com os dados e os parâmetros fornecidos
		JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(dados);

		// Carregue o arquivo JRXML
		InputStream jasperStream = getClass().getResourceAsStream("/relatorios/Blank_A4.jrxml");

		// Compile o JRXML em um objeto JasperReport
		JasperReport jasperReport = JasperCompileManager.compileReport(jasperStream);
		
		// Adicionando parâmetros
		Map<String, Object> parametros = new HashMap<>();
		parametros.put("dataInicio", sdf.format(DateUtils.toDate(dataInicio)));
		parametros.put("dataFim", sdf.format(DateUtils.toDate(dataFim)));
		
		// Preencha o relatório com os dados
		JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parametros, dataSource);

		// Exporte o relatório preenchido para PDF
		return JasperExportManager.exportReportToPdf(jasperPrint);
	}

	
	private String buscarDataPrimeiroPedidoCadastrado() {
		
		PedidoGetDTO pedido = pedidoService.buscarPrimeiroPedidoCadastrado();
		
		if(pedido != null) {
			String data = pedido.getDataPedido();
			
			return data;
		}
		
		throw new EntityNotFoundException("Ainda não existem pedidos cadastrados.");
	}


	public List<RankingVendasDTO> buscarRankigProdutosPorPeriodo(String dataInicio, String dataFim) {

		Date inicio = DateUtils.toDate(dataInicio);
		Date fim = DateUtils.toDate(dataFim);
		
		List<Object[]> result = relatoriosRepository.buscarRankigProdutosPorPeriodo(inicio, fim);
		
		List<RankingVendasDTO> lista = new ArrayList<RankingVendasDTO>();

		if (!Validacoes.isEmpty(result)) {

			for (Object[] dto : result) {

				Integer idProduto = (Integer) dto[0];
				BigDecimal totalVendidos = (BigDecimal) dto[1];

				if (idProduto != null && totalVendidos.compareTo(BigDecimal.ZERO) != 0) {

					Optional<Produto> produto = produtoRepository.findById(idProduto);

					// Verifica se o Optional contém um valor antes de acessá-lo
					produto.ifPresent(p -> {

						RankingVendasDTO item = new RankingVendasDTO();
					
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
			throw new EntityNotFoundException("Dados do filtro incorretos");
		}
		return lista;
	}

}
