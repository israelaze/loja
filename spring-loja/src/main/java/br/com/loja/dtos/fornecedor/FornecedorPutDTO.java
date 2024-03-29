package br.com.loja.dtos.fornecedor;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class FornecedorPutDTO {
	
	@NotNull
	private Integer idFornecedor;
	
	@NotBlank(message = "{nome.not.blank}")
	private String nomeFornecedor;
//	private String cpfCnpj;
	
	@NotBlank(message = "{telefone.not.blank}")
	@Size(min= 8, max = 11, message = "{telefone.size}")
	@Pattern(regexp = "^\\d+$", message = "{number.pattern}")
	private String telefone1;
	private String telefone2;
	
	@Email(message = "{email.email}")
	private String email;
	private String logradouro;
	private String numero;
	private String complemento;
	private String condominio;
	private String bairro;	
	private String municipio;
	private String estado;
	private String cep;


}
