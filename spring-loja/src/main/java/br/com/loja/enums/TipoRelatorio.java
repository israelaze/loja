package br.com.loja.enums;

public enum TipoRelatorio {
	
	PRODUTO(1),
	CLIENTE(2);
	
	private int codigo;
	
	private TipoRelatorio(int codigo) {
		this.codigo = codigo;
	}
	
	public int getCodigo() {
		return codigo;
	}
	
}
