package br.com.loja.services;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;

import br.com.loja.enums.Estado;

@Service
public class EstadosService {
	
	public List<String> buscarTodos() {

		// Consultando todos os Estados
		List<String> lista = Stream.of(Estado.values())
//				.map(estado -> estado.getNome()).sorted()
				.map(estado -> estado.name()).sorted()

				.collect(Collectors.toList());

		return lista;
	}

}
