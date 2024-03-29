package br.com.loja.dtos.cliente;


import br.com.loja.dtos.endereco.EnderecoDTO;
import br.com.loja.entities.Cliente;
import br.com.loja.utils.DateUtils;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ClienteGetDTO {
	
	private Integer idCliente;
	private String nome;
	private String cpf;
	private String dataNascimento;
	private String telefone1;
	private String telefone2;
	private String email;
	private String observacao;
	private byte[] foto;
	private EnderecoDTO endereco;
	
	// Convertendo um cliente em Dto via construtor
	public ClienteGetDTO(Cliente cliente) {
		
		this.idCliente = cliente.getIdCliente();
		this.nome = cliente.getNome();
		this.cpf = cliente.getCpf();
		
		if(cliente.getDataNascimento() != null) {
			this.dataNascimento = DateUtils.toString(cliente.getDataNascimento());

		}
		this.telefone1 = cliente.getTelefone1();
		this.telefone2 = cliente.getTelefone2();
		this.email = cliente.getEmail();
		this.observacao = cliente.getObservacao();
		this.foto = cliente.getFoto();
		
//		if(cliente.getFoto() != null) {
//			this.foto = ImagemUtils.decompressImage(cliente.getFoto());
//		}
		
		if(cliente.getEndereco() != null) {
			this.endereco = new EnderecoDTO(cliente.getEndereco());
		}
		
	}

}
