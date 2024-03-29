package br.com.loja.entities;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
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
@Table(name = "fornecedores")
public class Fornecedor implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@Setter(AccessLevel.NONE)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idFornecedor;

	@Column(length = 100, nullable = false)
	private String nomeFornecedor;
	
	@Column(length = 20, nullable = false, unique = true)
	private String cpfCnpj;
	
	@Column(length = 15, nullable = false, unique = true)
	private String telefone1;
	
	@Column(length = 15, unique = true)
	private String telefone2;
	
	@Column(length = 60, unique = true)
	private String email;

	@OneToOne
	@JoinColumn(name = "idEndereco", unique = true)
	private Endereco endereco;
	
	@OneToMany(mappedBy = "fornecedor") 
	private Set<Produto> produtos = new HashSet<>();
	
	public Fornecedor(String nomeFornecedor, String cpfCnpj, String telefone1, String telefone2,
			String email, Endereco endereco) {
		this.nomeFornecedor = nomeFornecedor;
		this.cpfCnpj = cpfCnpj;
		this.telefone1 = telefone1;
		this.telefone2 = telefone2;
		this.email = email;
		this.endereco = endereco;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Fornecedor other = (Fornecedor) obj;
		return Objects.equals(cpfCnpj, other.cpfCnpj) || Objects.equals(email, other.email)
				|| Objects.equals(telefone1, other.telefone1) || Objects.equals(telefone2, other.telefone2);
	}

	@Override
	public int hashCode() {
		return Objects.hash(cpfCnpj, email, telefone1, telefone2);
	}

	@Override
	public String toString() {
		return "Fornecedor [idFornecedor=" + idFornecedor + ", nomeFornecedor=" + nomeFornecedor + ", cpfCnpj="
				+ cpfCnpj + ", telefone1=" + telefone1 + ", telefone2=" + telefone2 + ", email=" + email + ", endereco="
				+ endereco + ", produtos=" + produtos + "]";
	}

}
