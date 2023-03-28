package br.com.loja.entities;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
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
@Table(name = "produtos")
public class Produto implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@Setter(AccessLevel.NONE)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idProduto;

	@Column(length = 50, nullable = false)
	private String nomeProduto;

	@Column(length = 15, nullable = false, unique = true)
	private String codigo;

	@Column(length = 255)
	private String descricao;

	@Temporal(TemporalType.DATE)
	private Date dataCadastro;

	private boolean ativo;
	private Double peso;
	private Double valorCusto;
	private Double valorVenda;
	
	@Setter(AccessLevel.NONE)
	private Double margemLucro;
	
	@Lob
	private byte[] foto;

	@ManyToOne
	@JoinColumn(name = "idFornecedor", nullable = false)
	private Fornecedor fornecedor;

	@OneToMany(mappedBy = "idItemPedido.produto") 
	private Set<ItemPedido> itens = new HashSet<>();
	
	public Produto(String nomeProduto, String codigo, String descricao, Date dataCadastro, boolean ativo, Double peso, Double valorCusto,
			Double valorVenda, byte[] foto, Fornecedor fornecedor) {
		this.nomeProduto = nomeProduto;
		this.codigo = codigo;
		this.descricao = descricao;
		this.dataCadastro = dataCadastro;
		this.ativo = ativo;
		this.peso = peso;
		this.valorCusto = valorCusto;
		this.valorVenda = valorVenda;
		this.foto = foto;
		this.margemLucro = valorVenda - valorCusto;
		this.fornecedor = fornecedor;
	}
	
	public void atualizar(String nomeProduto, String descricao, boolean ativo, Double peso, Double valorCusto,
			Double valorVenda, Fornecedor fornecedor) {
		this.nomeProduto = nomeProduto;
		this.descricao = descricao;
		this.ativo = ativo;
		this.peso = peso;
		this.valorCusto = valorCusto;
		this.valorVenda = valorVenda;
		this.margemLucro = valorVenda - valorCusto;
		this.fornecedor = fornecedor;
	}
	
	public String getAtivo() {
		if(this.ativo) {
			return "SIM";
		}
		return "NÃO";
	}
	
	public void setMargemLucro(Double valorCusto, Double valorVenda) {
		this.margemLucro = 0.0;
		this.margemLucro = valorVenda - valorCusto;
	}
	
	public Set<Pedido> getPedidos(){
		Set<Pedido> set = new HashSet<>();
		for(ItemPedido x : itens) {
			set.add(x.getPedido());
		}
		return set;
	}

	@Override
	public int hashCode() {
		return Objects.hash(descricao, fornecedor, nomeProduto, peso);
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Produto other = (Produto) obj;
		return Objects.equals(descricao, other.descricao) && Objects.equals(fornecedor, other.fornecedor)
				&& Objects.equals(nomeProduto, other.nomeProduto) && Objects.equals(peso, other.peso);
	}

	@Override
	public String toString() {
		return "Produto [idProduto=" + idProduto + ", nomeProduto=" + nomeProduto + ", codigo=" + codigo
				+ ", fornecedor=" + fornecedor + "]";
	}
	

}
