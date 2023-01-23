package br.com.loja.dtos.vendedor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class VendedorPutDTO {
	
	@NotNull
	private Integer idVendedor;
	
	@NotBlank(message = "{nome.not.blank}")
	private String nome;
	
	private String apelido;

}
