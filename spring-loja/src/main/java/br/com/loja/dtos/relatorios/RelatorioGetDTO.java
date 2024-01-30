package br.com.loja.dtos.relatorios;

import java.math.BigDecimal;
import java.util.List;

import br.com.loja.dtos.cliente.ClienteGetDTO;
import br.com.loja.dtos.pedido.PedidoGetDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RelatorioGetDTO {
	
	// para relatorio tipo produto
	private String codigoProduto;
	private String nomeProduto;
	private String categoria;
	private String nomeFornecedor;
	private BigDecimal totalVendidos;
	private BigDecimal valorTotal;
	
	// para relatorio tipo cliente
	private ClienteGetDTO cliente;
	private List<PedidoGetDTO> pedidos;
	private BigDecimal totalPedidos;

}
