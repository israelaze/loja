package br.com.loja.dtos.relatorios;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RankingVendasDTO {
	
	private String codigoProduto;
	private String nomeProduto;
	private String categoria;
	private String nomeFornecedor;
	private BigDecimal totalVendidos;
	private BigDecimal valorTotal;

}
