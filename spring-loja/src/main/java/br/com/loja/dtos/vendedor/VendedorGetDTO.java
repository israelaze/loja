package br.com.loja.dtos.vendedor;

import br.com.loja.entities.Vendedor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class VendedorGetDTO {

	private Integer idVendedor;
	private String nome;
	private String apelido;
	
	// Convertendo um Vendedor em Dto via construtor
	public VendedorGetDTO(Vendedor vendedor) {
		
		this.idVendedor = vendedor.getIdVendedor();
		this.nome = vendedor.getNome();
		this.apelido = vendedor.getApelido();
	}
}
