package br.com.loja.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.loja.entities.Pedido;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Integer>{

	public Optional<Pedido> findByNumeroPedido(String numeroPedido);
	
	// buscando uma lista de pedidos associados ao cliente fornecido
	@Query("from Pedido p join p.cliente c where c.idCliente = :param") //JPQL
	public List<Pedido> buscarPedidosByCliente(@Param("param") Integer idCliente);

}
