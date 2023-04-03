package br.com.loja.enums;

public enum TipoPeso {

	g("g"),
	Kg("Kg");

	private final String descricao;
	
	private TipoPeso(String descricao) {
		this.descricao = descricao;
	}
	
	public String getDescricao() {
		return descricao;
	}
	
}
