package br.com.loja.dtos.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class AuthPostDTO {
	
	@NotBlank(message =  "{email.not.blank}")
//	@Email(message = "{email.email}")
	private String email;
	
	@NotBlank(message = "{senha.not.blank}")
	 String senha;

}
