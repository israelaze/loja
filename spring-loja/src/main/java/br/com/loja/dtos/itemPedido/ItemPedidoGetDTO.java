package br.com.loja.dtos.itemPedido;

import br.com.loja.dtos.produto.ProdutoGetDTO;
import br.com.loja.entities.ItemPedido;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ItemPedidoGetDTO {

	private Integer quantidade;
	private Double preco;
	private Double subTotal;
	private ProdutoGetDTO produto;
	
	// Convertendo um ItemPedido em Dto via construtor
	public ItemPedidoGetDTO(ItemPedido item) {
		this.quantidade = item.getQuantidade();
		this.preco = item.getPreco();
		this.subTotal = item.getSubTotal();
		this.produto = new ProdutoGetDTO(item.getProduto());
	}
}
