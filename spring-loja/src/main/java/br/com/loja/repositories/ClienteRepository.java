package br.com.loja.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.loja.entities.Cliente;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Integer>{
	
	public Optional<Cliente> findByCpf(String cpf);
	public Optional<Cliente> findByTelefone1(String tefefone1);

	// buscando uma lista de clientes associados ao endereço fornecido
	@Query("from Cliente c join c.endereco e where e.idEndereco = :param") //JPQL
	public Optional<List<Cliente>> findByIdEnderecoJoinEndereco(@Param("param") Integer idEndereco);

}
