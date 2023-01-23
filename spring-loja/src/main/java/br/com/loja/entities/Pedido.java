package br.com.loja.entities;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import br.com.loja.enums.SituacaoPedido;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "pedidos")
public class Pedido implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@Setter(AccessLevel.NONE)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idPedido;
	
	@Column(length = 10, nullable = false, unique = true)
	private String numeroPedido;

	@Column(nullable = false)
	@Temporal(TemporalType.DATE)
	private Date dataPedido;

	@Temporal(TemporalType.DATE)
	private Date dataEntrega;

	@Enumerated(EnumType.STRING)
	private SituacaoPedido situacao;
	
	private Double desconto = 0.0;
	
	@Setter(AccessLevel.NONE)
	private Double total = 0.0;
	
	@ManyToOne
	@JoinColumn(name = "idCliente", nullable = false)
	private Cliente cliente;
	
	@OneToMany(mappedBy = "idItemPedido.pedido")
	private Set<ItemPedido> itens = new HashSet<>();
	
	@ManyToOne
	@JoinColumn(name = "idVendedor", nullable = false)
	private Vendedor vendedor;
	
	public Pedido(String numeroPedido, Date dataPedido, 
			SituacaoPedido situacao, Double desconto, Cliente cliente, Vendedor vendedor) {
		this.numeroPedido = numeroPedido;
		this.dataPedido = dataPedido;
		this.situacao = situacao;
		this.desconto = desconto;
		this.cliente = cliente;
		this.vendedor = vendedor;
	}
	
	// método para calcular o total do pedido
	public Double getTotal() {
		double soma = 0.0;
		for(ItemPedido x : itens) {
			soma += x.getSubTotal();
		}
		this.total = soma - desconto;
		return total;
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(numeroPedido);
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Pedido other = (Pedido) obj;
		return Objects.equals(numeroPedido, other.numeroPedido);
	}

	@Override
	public String toString() {
		return "Pedido [idPedido=" + idPedido + ", numeroPedido=" + numeroPedido + ", dataPedido=" + dataPedido
				+ ", dataEntrega=" + dataEntrega + ", situacao=" + situacao + ", desconto=" + desconto + ", total="
				+ total + ", cliente=" + cliente + ", itens=" + itens + ", vendedor=" + vendedor + "]";
	}
	
}
