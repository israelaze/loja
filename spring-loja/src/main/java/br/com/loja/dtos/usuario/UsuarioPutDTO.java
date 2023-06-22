package br.com.loja.dtos.usuario;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class UsuarioPutDTO {
	
	@NotNull
	private Integer idUsuario;
	
	@NotBlank(message = "{nome.not.blank}")
	private String nome;
		
	//private String email; NÃO PERMITIDO ATUALIZAR EMAIL DO USUÁRIO
	
	@NotBlank(message = "{senha.not.blank}")
	private String senha;
	
}
