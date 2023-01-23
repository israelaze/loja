package br.com.loja.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.loja.entities.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Integer>{

	public Optional<Produto> findByCodigo(String codigo);
	
	public Optional<Produto> findByNomeProdutoAndDescricaoAndPesoAndValorVenda(String nomeProduto, String descricao, Double peso, Double valorVenda);	

}
