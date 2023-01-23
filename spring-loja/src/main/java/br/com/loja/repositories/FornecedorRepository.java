package br.com.loja.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.loja.entities.Fornecedor;

@Repository
public interface FornecedorRepository extends JpaRepository<Fornecedor, Integer>{
	
	public Optional<Fornecedor> findByCpfCnpj(String cpfCnpj);


}
