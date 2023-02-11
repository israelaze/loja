package br.com.loja.dtos.usuario;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioGetDTO {
	
	private Integer idUsuario;
	private String nome;
	private String sobreNome;
	private String email;
	private String perfil;

}
