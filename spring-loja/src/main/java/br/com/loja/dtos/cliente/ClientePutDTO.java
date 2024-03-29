package br.com.loja.dtos.cliente;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
public class ClientePutDTO {
	
	@NotNull
	private Integer idCliente;
	
	@NotBlank(message = "{nome.not.blank}")
	private String nome;
//	private String cpf; NÃO PERMITIDO ALTERAR CPf
	
	@Setter
	private String dataNascimento;
	
	@NotBlank(message = "{telefone.not.blank}")
	@Size(min= 8, max = 11, message = "{telefone.size}")
	@Pattern(regexp = "^\\d+$", message = "{number.pattern}")
	private String telefone1;
	
	private String telefone2;
	
	@Email(message = "{email.email}")
	private String email;
	
	private String observacao;
	
	@Setter
	private byte[] foto;
	
	private String logradouro;
	private String numero;
	private String complemento;
	private String condominio;
	private String bairro;	
	private String municipio;
	private String estado;
	private String cep;	

}
