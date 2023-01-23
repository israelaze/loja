package br.com.loja.dtos.pedido;

import java.util.List;

import br.com.loja.dtos.itemPedido.ItemPedidoPostDTO;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class PedidoPostDTO {

	private String situacao;
	private Double desconto;
	
	@NotNull
	private Integer idCliente;
	
	@NotNull
	private Integer idVendedor;
	
	private List<ItemPedidoPostDTO> itens;
}
