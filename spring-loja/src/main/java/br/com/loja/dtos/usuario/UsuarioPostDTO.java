package br.com.loja.dtos.usuario;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class UsuarioPostDTO {
	
	@NotBlank(message = "{nome.not.blank}")
	private String nome;
	
	private String sobrenome;
	
	@NotBlank(message = "{email.not.blank}")
//	@Email(message = "{email.email}")
	private String email;
	
	@NotBlank(message = "{senha.not.blank}")
	private String senha;
	
}
