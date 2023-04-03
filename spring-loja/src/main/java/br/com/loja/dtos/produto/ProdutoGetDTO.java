package br.com.loja.dtos.produto;

import br.com.loja.dtos.fornecedor.FornecedorGetDTO;
import br.com.loja.entities.Produto;
import br.com.loja.enums.Categoria;
import br.com.loja.enums.TipoPeso;
import br.com.loja.utils.DateUtils;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ProdutoGetDTO {
	
	private Integer idProduto;
	private String nomeProduto;
	private String codigo;
	private String descricao;
	private String dataCadastro;
	private String ativo;
	private Double peso;
	private Double valorCusto;
	private Double valorVenda;
	private Double margemLucro;
	private TipoPeso tipoPeso;
	private Categoria categoria;
	private byte[] foto;
	
	private FornecedorGetDTO fornecedor;
	
	public ProdutoGetDTO(Produto produto) {
		this.idProduto = produto.getIdProduto();
		this.nomeProduto = produto.getNomeProduto();
		this.codigo = produto.getCodigo();
		this.descricao = produto.getDescricao();
		this.dataCadastro = DateUtils.toString(produto.getDataCadastro());
		this.ativo =  produto.getAtivo();
		this.peso = produto.getPeso();
		this.valorCusto = produto.getValorCusto();
		this.valorVenda = produto.getValorVenda();
		
		if(this.valorCusto != null && this.valorVenda != null) {
			this.margemLucro = produto.getMargemLucro();
		}
		this.tipoPeso =  produto.getTipoPeso();
		this.categoria = produto.getCategoria();
		this.foto = produto.getFoto();
		this.fornecedor = new FornecedorGetDTO(produto.getFornecedor());
	}

}
