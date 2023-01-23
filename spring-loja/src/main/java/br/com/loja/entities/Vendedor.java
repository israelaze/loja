package br.com.loja.entities;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "vendedores")
public class Vendedor implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@Setter(AccessLevel.NONE)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idVendedor;

	@Column(length = 100, nullable = false)
	private String nome;

	@Column(length = 50)
	private String apelido;
	
	@OneToMany(mappedBy = "vendedor")
	private Set<Pedido> pedidos = new HashSet<>();

}
