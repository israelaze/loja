package br.com.loja.enums;

public enum SituacaoPedido {
	
	NÃO_PAGO(1),
	PAGO(2),
	CANCELADO(3);
	
	private int codigo;
	
	private SituacaoPedido(int codigo) {
		this.codigo = codigo;
	}
	
	public int getCodigo() {
		return codigo;
	}
	

//	public static SituacaoPedido valueOf(int codigo) {
//		for(SituacaoPedido result : SituacaoPedido.values()) {
//			if(result.getCodigo() == codigo) {
//				return result;
//			}
//		}
//		throw new BadRequestException("Código inválido");
//	}
}
