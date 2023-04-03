package br.com.loja.services;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;

import br.com.loja.enums.Categoria;

@Service
public class CategoriaService {

	public List<String> buscarCategorias(){
		
		// Consultando todas as Categorias
		List<String> categorias = Stream.of(Categoria.values())
				.map(Categoria::name)
				.collect(Collectors.toList());
		
		return categorias;
	}
}
