package br.com.loja.dtos.auth;

import br.com.loja.enums.Perfil;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AuthGetDTO {

	private Integer idUsuario;
	private String nome;
	private Perfil perfil;
//	private String sobreNome;
//	private String email;
	private String accessToken;
	
}