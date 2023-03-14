package br.com.loja.seed;

import java.time.Instant;
import java.util.Arrays;
import java.util.Date;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;

import br.com.loja.entities.Cliente;
import br.com.loja.entities.Endereco;
import br.com.loja.entities.Fornecedor;
import br.com.loja.entities.ItemPedido;
import br.com.loja.entities.Pedido;
import br.com.loja.entities.Produto;
import br.com.loja.entities.Usuario;
import br.com.loja.entities.Vendedor;
import br.com.loja.enums.Estado;
import br.com.loja.enums.Perfil;
import br.com.loja.enums.SituacaoPedido;
import br.com.loja.repositories.ClienteRepository;
import br.com.loja.repositories.EnderecoRepository;
import br.com.loja.repositories.FornecedorRepository;
import br.com.loja.repositories.ItemPedidoRepository;
import br.com.loja.repositories.PedidoRepository;
import br.com.loja.repositories.ProdutoRepository;
import br.com.loja.repositories.UsuarioRepository;
import br.com.loja.repositories.VendedorRepository;
import br.com.loja.utils.DateUtils;
import br.com.loja.utils.RandomUtils;
import lombok.AllArgsConstructor;

@Configuration
@Profile("test")
@AllArgsConstructor
public class PopularBanco implements CommandLineRunner{
	
	private final UsuarioRepository usuarioRepository;
	private final EnderecoRepository enderecoRepository;
	private final ClienteRepository clienteRepository;
	private final FornecedorRepository fornecedorRepository;
	private final ProdutoRepository produtoRepository;
	private final PedidoRepository pedidoRepository;
	private final ItemPedidoRepository itemPedidoRepository;
	private final VendedorRepository vendedorRepository;
	
	private final PasswordEncoder passwordEncoder;

	
	@Override
	public void run(String... args) throws Exception {
		
		// CADASTRANDO USUÁRIOS
		Usuario usu1 = new Usuario(null, "Edy", "Mota", "t1@gmail.com", passwordEncoder.encode("1234"), Perfil.ADMIN);
		Usuario usu2 = new Usuario(null, "Ana", "", "t2@gmail.com", passwordEncoder.encode("1234"), Perfil.USER);
		
		usuarioRepository.saveAll(Arrays.asList(usu1, usu2));
		
		// CADASTRANDO ENDEREÇOS
		Endereco endCliente1 = new Endereco("Rua Albert", "99", null, null, "Bnh", "Mesquita", Estado.RJ, "33333666"); 
		Endereco endCliente2 = new Endereco("Rua Alves", "40", null, null, "Barra Funda", "São Paulo", Estado.SP, "11111111");
		Endereco endFornecedor1 = new Endereco("Rua Kennedy", "10", null, null, "Pampulha", "Belo Horizonte", Estado.MG, "22222222");
		Endereco endFornecedor2 = new Endereco("Rua Rufino", "23", "Edificio Solar, Sala 99", "Palmeiras", "Abranches", "Curitiba", Estado.PR, "33333333");
		
		enderecoRepository.saveAll(Arrays.asList(endCliente1, endCliente2, endFornecedor1, endFornecedor2));
		
		// CADASTRANDO CLIENTES
		Cliente cli1 = new Cliente("Bia Souza", "111111111-11", DateUtils.toDate("1999-05-02"), "999999999", "33333333", "bia@bol.com", "Cliente chata a bessa kk", endCliente1, null);
		Cliente cli2 = new Cliente("Edy Silva", "222222222-22", DateUtils.toDate("2002-08-10"), "888888888", null, "edy@bol.com", null, endCliente2, null);
		Cliente cli3 = new Cliente("Tom Melo", "333333333-33", DateUtils.toDate("1995-01-15"), "777777777", null, "tom@bol.com", "O cara parece o Jaspion kkk", endCliente1, null);
		Cliente cli4 = new Cliente("Ana Silva", "444444444-44", null, "666666666", null, "ana@bol.com", null, endCliente1, null);
		Cliente cli5 = new Cliente("Tião Silva", "55555555-55", DateUtils.toDate("1989-09-02"), "555555555", null, "tiao@bol.com", null, endCliente2, null);
		Cliente cli6 = new Cliente("Caio Silva", "66666666-66", DateUtils.toDate("1989-09-02"), "444444444", null, "caio@bol.com", null, null, null);
				
		clienteRepository.saveAll(Arrays.asList(cli1, cli2, cli3, cli4, cli5, cli6));
		
		// CADASTRANDO FORNECEDORES
		Fornecedor forn1 = new Fornecedor("Sadia", "05.565.279/0001-74", "3263-3666", "2690-0000", "sadia@bol.com", endFornecedor1);
		Fornecedor forn2 = new Fornecedor("Lg", "15.565.279/0001-02", "3769-0001", null, "lg@bol.com", endFornecedor2);
		Fornecedor forn3 = new Fornecedor("Consul", "28.565.279/0001-38", "2598-0322", null, "consul@bol.com", null);
		
		fornecedorRepository.saveAll(Arrays.asList(forn1, forn2, forn3));
		
		// CADASTRANDO PRODUTOS
		String cod1 = RandomUtils.gerarCodigoProdutoAleatorio();
		Date data1 = Date.from(Instant.now());		
		Produto prod1 = new Produto("Lasanha", cod1, "Sabor bolonhesa", data1, true, 250.0, 5.00, 11.00, forn3); 
		
		String cod2 = RandomUtils.gerarCodigoProdutoAleatorio();
		Date data2 = Date.from(Instant.now());	
		Produto prod2 = new Produto("Pizza", cod2, "Calabresa", data2, true, 0.4, 14.5, 25.5, forn1);
		
		String cod3 = RandomUtils.gerarCodigoProdutoAleatorio();
		Date data3 = Date.from(Instant.now());	
		Produto prod3 = new Produto("Monitor", cod3, "22 pol", data3, true, 600.0 ,850.0, 1500.0, forn2);
		
		String cod4 = RandomUtils.gerarCodigoProdutoAleatorio();
		Date data4 = Date.from(Instant.now());	
		Produto prod4 = new Produto("Mouse", cod4, "Verde", data4, true, 25.0, 30.0, 45.0, forn3);

		produtoRepository.saveAll(Arrays.asList(prod1, prod2, prod3,prod4));
		
		// CADASTRANDO VENDEDORES
		Vendedor vend1 = new Vendedor(null, "Joãozinho",  "dev", null);
		Vendedor vend2 = new Vendedor(null, "Mariazinha", null , null);
		
		vendedorRepository.saveAll(Arrays.asList(vend1, vend2));
		
		// CADASTRANDO PEDIDOS	
		Pedido ped1 = new Pedido(null, RandomUtils.gerarNumeroPedidoAleatorio(), DateUtils.toDate("2023-01-09"), DateUtils.toDate("2023-01-10"), SituacaoPedido.PAGO, 0.0 , null, cli4, null, vend2);
		Pedido ped2 = new Pedido(RandomUtils.gerarNumeroPedidoAleatorio(),DateUtils.toDate("2022-12-02"), SituacaoPedido.PAGO, 12.5, cli2, vend1);
		Pedido ped3 = new Pedido(RandomUtils.gerarNumeroPedidoAleatorio(),DateUtils.toDate("1999-05-02"), SituacaoPedido.PAGO, 50.0, cli3, vend2);
		Pedido ped4 = new Pedido(RandomUtils.gerarNumeroPedidoAleatorio(),DateUtils.toDate("1999-05-02"), SituacaoPedido.PAGO, 10.0, cli1, vend2);
		Pedido ped5 = new Pedido(null, RandomUtils.gerarNumeroPedidoAleatorio(), DateUtils.toDate("2022-11-09"), DateUtils.toDate("2022-11-11"), SituacaoPedido.PAGO, 5.0, null, cli6, null, vend2);
		Pedido ped6 = new Pedido(RandomUtils.gerarNumeroPedidoAleatorio(),DateUtils.toDate("2019-09-02"), SituacaoPedido.PAGO, 0.0, cli2, vend1);

		pedidoRepository.saveAll(Arrays.asList(ped1, ped2, ped3, ped4, ped5, ped6));

		// CADASTRANDO ITEM DE PEDIDO
		ItemPedido item1 = new ItemPedido(ped1, prod1, 1, prod1.getValorVenda());
		ItemPedido item2 = new ItemPedido(ped1, prod2, 2, prod2.getValorVenda());
		ItemPedido item3 = new ItemPedido(ped1, prod3, 3, prod3.getValorVenda());
		ItemPedido item4 = new ItemPedido(ped2, prod1, 2, prod1.getValorVenda());
		ItemPedido item5 = new ItemPedido(ped3, prod2, 3, prod2.getValorVenda());
		ItemPedido item6 = new ItemPedido(ped4, prod4,10, prod4.getValorVenda());
		ItemPedido item7 = new ItemPedido(ped5, prod4,10, prod4.getValorVenda());
		ItemPedido item8 = new ItemPedido(ped6, prod1, 2, prod1.getValorVenda());

		itemPedidoRepository.saveAll(Arrays.asList(item1, item2,item3, item4, item5, item6, item7, item8));
	
	}

}
