package br.com.loja.dtos.auth;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AuthGetDTO {
	
	private Integer idUsuario;
	private String nome;
	private String sobreNome;
	private String email;
	private String accessToken;
	
	
//	public AuthGetDTO(Usuario usuario) {
//		this.idUsuario = usuario.getIdUsuario();
//		this.nome = usuario.getNome();
//		this.email = usuario.getEmail();
//		// Gerando o token do para o Usuário
//		this.accessToken = TokenSecurity.generateToken(usuario.getEmail());
//	}
}