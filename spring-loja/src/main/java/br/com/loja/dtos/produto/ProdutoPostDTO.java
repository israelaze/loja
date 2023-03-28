package br.com.loja.dtos.produto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProdutoPostDTO {

	@NotBlank(message = "{nome.not.blank}")
	private String nomeProduto;
//	private String codigo;    - GERADO ALEATORIAMENTE
	private String descricao;
//	private String dataCadastro; - OBTIDO DO SISTEMA 
	private Boolean ativo;
	private Double peso;
	private Double valorCusto;
	private Double valorVenda;
	private byte[] foto;
	
	@NotNull
	private Integer idFornecedor;
}
