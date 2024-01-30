package br.com.loja.dtos.relatorios;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RelatorioFiltroDTO {
	
	private String dataInicio;   
	private String dataFim;
	private String tipoRelatorio;

}
