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


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "clientes")
public class Cliente implements Serializable{
	private static final long serialVersionUID = 1L;

	@Id
	@Setter(AccessLevel.NONE)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idCliente;
	
	@Column(length = 60, nullable = false)
	private String nome;
	
	@Column(length = 14, nullable = false, unique = true)
	private String cpf;
	
	@Temporal(TemporalType.DATE)
	private Date dataNascimento;
	
	@Column(length = 15, nullable = false)
	private String telefone1;
	
	@Column(length = 15)
	private String telefone2;
	
	@Column(length = 60)
	private String email;
	
	@Column(columnDefinition = "TEXT")
	private String observacao;
	
	@ManyToOne
	@JoinColumn(name = "idEndereco")
	private Endereco endereco;
	
	@OneToMany(mappedBy = "cliente")
	private Set<Pedido> pedidos = new HashSet<>();
	
//	@OneToOne
//	@JoinColumn(name = "idImagem", unique = true)
	@Lob
	private byte[] foto;
	
	public Cliente(String nome, String cpf, Date dataNascimento, String telefone1, String telefone2, String email,
			String observacao, Endereco endereco, byte [] foto) {
		this.nome = nome;
		this.cpf = cpf;
		this.dataNascimento = dataNascimento;
		this.telefone1 = telefone1;
		this.telefone2 = telefone2;
		this.email = email;
		this.observacao = observacao;
		this.endereco = endereco;
		this.foto = foto;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Cliente other = (Cliente) obj;
		return Objects.equals(cpf, other.cpf);
	}

	@Override
	public int hashCode() {
		return Objects.hash(cpf);
	}

	@Override
	public String toString() {
		return "Cliente [idCliente=" + idCliente + ", nome=" + nome + ", cpf=" + cpf + ", dataNascimento="
				+ dataNascimento + ", telefone1=" + telefone1 + ", email=" + email + ", endereco=" + endereco + "]";
	}
	
}
