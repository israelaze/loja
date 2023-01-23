package br.com.loja.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.loja.entities.Pedido;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Integer>{

	public Optional<Pedido> findByNumeroPedido(String numeroPedido);

}
