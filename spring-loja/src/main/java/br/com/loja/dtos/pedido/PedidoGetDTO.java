package br.com.loja.dtos.pedido;

import java.util.HashSet;
import java.util.Set;

import br.com.loja.dtos.cliente.ClienteGetDTO;
import br.com.loja.dtos.itemPedido.ItemPedidoGetDTO;
import br.com.loja.dtos.vendedor.VendedorGetDTO;
import br.com.loja.entities.ItemPedido;
import br.com.loja.entities.Pedido;
import br.com.loja.utils.DateUtils;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PedidoGetDTO {
	
	private Integer idPedido;
	private String numeroPedido;
	private String dataPedido;
	private String dataEntrega;
	private int situacao;
	private Double desconto;
	private Double total;
	private ClienteGetDTO cliente;
	private VendedorGetDTO vendedor;
	private Set<ItemPedidoGetDTO> itens;
		
	// Convertendo um Pedido em Dto via construtor
	public PedidoGetDTO(Pedido pedido) {
		this.idPedido = pedido.getIdPedido();
		this.numeroPedido = pedido.getNumeroPedido();
		this.dataPedido = DateUtils.toString(pedido.getDataPedido());
		this.dataEntrega = DateUtils.toString(pedido.getDataEntrega());
		this.situacao = pedido.getSituacao().getCodigo();
		this.desconto = pedido.getDesconto();
		this.total = pedido.getTotal();
		this.cliente = new ClienteGetDTO(pedido.getCliente());
		this.vendedor = new VendedorGetDTO(pedido.getVendedor());
		
		Set<ItemPedidoGetDTO> listaDto = new HashSet<>();
		
		for (ItemPedido itemPedido : pedido.getItens()) {
			ItemPedidoGetDTO itemDto = new ItemPedidoGetDTO(itemPedido);
			
			listaDto.add(itemDto);
		}
		
		this.itens = listaDto;
	}

}
