import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from 'src/app/produtos/models/produto';
import { Cliente } from './../../../clientes/models/cliente';
import { ClientesService } from './../../../clientes/services/clientes.service';
import { ProdutosService } from './../../../produtos/services/produtos.service';
import { ItemPedido } from './../../models/itemPedido';
import { CarrinhoService } from './../../services/carrinho.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit{

  //atributo para guardar o parâmetro recebido na rota
  parametro = this.route.snapshot.paramMap.get('id');

  produtos: Produto[] = [];
  itens: ItemPedido[] = [];
  cliente: Cliente = new Cliente;
  itemPedido: ItemPedido;

  constructor(private produtosService: ProdutosService,
    private snackBar: MatSnackBar,
    private carrinhoService: CarrinhoService,
    private clientesService: ClientesService,
    private route: ActivatedRoute,
    private router: Router)
  {}

  ngOnInit(){

    //converter STRING => NUMBER.
    this.converterStringToNumber(this.parametro);

    this.buscarCliente(this.cliente.idCliente);
    this.buscarProdutos();

  }

  buscarProdutos(): void{

    this.produtosService.buscarTodos().subscribe({
      next: produtos => {
        this.produtos = produtos;
      },
      error: e => {
        console.log(e.error);
        const msg: string = "Erro obtendo produtos.";
        this.snackBar.open(msg, "Erro", { duration: 5000 });
      }
    });

  }

  // BUSCAR cliente por id
  buscarCliente(idCliente: number): void {
    this.clientesService.buscarId(idCliente).subscribe({
      next: cliente => {
        this.cliente = cliente;
      },
      error: e => {
        console.log(e.error.message);

        this.router.navigate(['clientes/clientes-lista']);
        const msg: string = e.error.message;
        this.snackBar.open(msg, "Erro", { duration: 5000 });
      }
    })
  }

  adicionar(produto: Produto): void{

    this.itemPedido = new ItemPedido;

    this.itemPedido.produto = produto;
    this.itemPedido.preco  = produto.valorVenda;

    this.itens.push(this.itemPedido);
    this.carrinhoService.addItem(this.itemPedido);

    window.alert('Produto: ' + produto.nomeProduto + ' adicionado ao carrinho com sucesso.');

    // removendo o produto da lista de exibição
    this.produtos.splice(this.produtos.indexOf(produto), 1);

  }

  // CONVERSOR
  converterStringToNumber(parametro: string): void {
    console.log(typeof parametro);

    // Cliente recebe o id já convertido em NUMBER
    this.cliente.idCliente = +parametro;
    console.log(typeof this.cliente.idCliente);
  }

}
