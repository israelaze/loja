package br.com.loja.repositories;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.loja.entities.Relatorio;

@Repository	
public interface RelatoriosRepository extends JpaRepository<Relatorio, Integer>{
	
	@Query(nativeQuery = true, value = """ 
			SELECT i.produto_id AS idProduto, SUM(i.quantidade) AS quantidadeTotal
			FROM item_pedido i  
			INNER JOIN pedidos p
			ON p.id_pedido = i.pedido_id
			WHERE p.data_pedido BETWEEN :dataInicio AND :dataFim
			GROUP BY i.produto_id
			ORDER BY quantidadeTotal DESC 
			""")
	List<Object[]> buscarRankigProdutosPorPeriodo(@Param("dataInicio")Date dataInicio, @Param("dataFim")Date dataFim );
	
	
	@Query(nativeQuery = true, value = """
			SELECT c.id_cliente,  COUNT(p.id_pedido) AS totalPedidos
			FROM clientes c
			INNER JOIN pedidos p 
			ON c.id_cliente  = p.id_cliente
			WHERE p.data_pedido BETWEEN :dataInicio AND :dataFim
			GROUP BY c.id_cliente
			ORDER BY totalPedidos DESC  
			""")
	List<Object[]> buscarRankingClientesPorPeriodo(@Param("dataInicio")Date dataInicio, @Param("dataFim")Date dataFim );


}
