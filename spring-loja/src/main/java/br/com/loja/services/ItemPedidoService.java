package br.com.loja.services;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.stereotype.Service;

import br.com.loja.dtos.itemPedido.ItemPedidoPostDTO;
import br.com.loja.entities.ItemPedido;
import br.com.loja.entities.Pedido;
import br.com.loja.entities.Produto;
import br.com.loja.exceptions.BadRequestException;
import br.com.loja.repositories.ItemPedidoRepository;
import br.com.loja.repositories.ProdutoRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class ItemPedidoService {

	private final ItemPedidoRepository itemPedidoRepository;
	private final ProdutoRepository produtoRepository;

	public Set<ItemPedido> cadastrar(Pedido pedido, List<ItemPedidoPostDTO> lista) {
		
		Set<ItemPedido> itens = new HashSet<ItemPedido>();
		
		double total = 0.0;
		
		for (ItemPedidoPostDTO itemDto : lista) {
			
			Optional<Produto> prod = produtoRepository.findById(itemDto.getIdProduto());
			Produto produto = prod.get();
			
			if(produto.getAtivo() != true) {
				throw new BadRequestException("O produto: " + produto.getNomeProduto()+ " - cód:" + produto.getCodigo() + ", não está ativo no momento.");
			}

			ItemPedido item = new ItemPedido(pedido, produto, itemDto.getQuantidade(), produto.getValorVenda());
						
			itens.add(item);
			
			// calculando o valor total do pedido, sem o desconto
			total += item.getSubTotal();
		}
		
		if(total < pedido.getDesconto()) {
			throw new BadRequestException("O valor do desconto não pode ser superior ao valor total do pedido.");
		}
		
		// salvando os ítens do pedido
		itemPedidoRepository.saveAll(itens);
		
		return itens;
	}
}
