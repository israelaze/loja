/*
 * Classe auxiliar, usada como chave composta, para fazer referência
 * para o produto e o pedido
 */

package br.com.loja.entities.pk;

import java.io.Serializable;

import br.com.loja.entities.Pedido;
import br.com.loja.entities.Produto;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode
@Embeddable
public class ItemPedidoPk implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@ManyToOne
	@JoinColumn(name = "pedido_id")
	private Pedido pedido;
	
	@ManyToOne
	@JoinColumn(name = "produto_id")
	private Produto produto;

}
