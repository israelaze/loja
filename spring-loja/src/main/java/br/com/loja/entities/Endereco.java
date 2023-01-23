package br.com.loja.entities;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import br.com.loja.enums.Estado;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Table(name = "enderecos")
public class Endereco implements Serializable{
	private static final long serialVersionUID = 1L;

	@Id
	@Setter(AccessLevel.NONE)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idEndereco;

	@Column(length = 60)
	private String logradouro;

	@Column(length = 10)
	private String numero;
	
	@Column(length = 60)
	private String complemento;
	
	@Column(length = 60)
	private String condominio;

	@Column(length = 60)
	private String bairro;
	
	@Column(length = 60)
	private String municipio;
	
	@Enumerated(EnumType.STRING)
	private Estado estado;
	
	@Column(length = 9)
	private String cep;

	@OneToMany(mappedBy = "endereco")
	private Set<Cliente> clientes = new HashSet<>();

	@OneToOne(mappedBy = "endereco", cascade = CascadeType.ALL)
	private Fornecedor fornecedor;
	
	public Endereco(String logradouro, String numero, String complemento, String condominio, String bairro,
			String municipio, Estado estado, String cep) {
		this.logradouro = logradouro;
		this.numero = numero;
		this.complemento = complemento;
		this.condominio = condominio;
		this.bairro = bairro;
		this.municipio = municipio;
		this.estado = estado;
		this.cep = cep;
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(cep, complemento, idEndereco, logradouro, numero);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Endereco other = (Endereco) obj;
		return Objects.equals(cep, other.cep) && Objects.equals(complemento, other.complemento)
				&& Objects.equals(idEndereco, other.idEndereco) && Objects.equals(logradouro, other.logradouro)
				&& Objects.equals(numero, other.numero);
	}

}
