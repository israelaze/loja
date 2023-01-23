package br.com.loja.dtos.vendedor;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class VendedorPostDTO {
	
	@NotBlank(message = "{nome.not.blank}")
	private String nome;
	
	private String apelido;

}
