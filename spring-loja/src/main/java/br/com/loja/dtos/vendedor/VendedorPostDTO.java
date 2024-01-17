package br.com.loja.dtos.vendedor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class VendedorPostDTO {
	
	@Size(min= 3, max = 50, message = "{nome.size}")
	@NotBlank(message = "{nome.not.blank}")
	private String nome;
	
	private String apelido;

}
