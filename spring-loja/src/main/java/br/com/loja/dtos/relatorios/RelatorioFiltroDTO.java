package br.com.loja.dtos.relatorios;

import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RelatorioFiltroDTO {

    @Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$", message = "Formato de data inválido. Use o formato yyyy-MM-dd.")
	private String dataInicio;
    
    @Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$", message = "Formato de data inválido. Use o formato yyyy-MM-dd.")
	private String dataFim;

}
