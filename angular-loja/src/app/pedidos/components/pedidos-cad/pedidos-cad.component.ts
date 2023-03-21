import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/pedidos/models/pedido';
import { ItemPedido } from '../../models/itemPedido';
import { CarrinhoService } from '../../services/carrinho.service';
import { Produto } from './../../../produtos/models/produto';
import { ProdutosService } from './../../../produtos/services/produtos.service';
import { AlertService } from './../../../util/services/alert.service';
import { ItemPedidoPost } from './../../models/itemPedidoPost';
import { PedidoPost } from './../../models/pedidoPost';
import { PedidosService } from './../../services/pedidos.service';

@Component({
  selector: 'app-pedidos-cad',
  templateUrl: './pedidos-cad.component.html',
  styleUrls: ['./pedidos-cad.component.scss']
})
export class PedidosCadComponent implements OnInit {

  produtos: Produto[] = [];

  itens: ItemPedidoPost[] = [];

  itemPedido: ItemPedido = new ItemPedido;

  pedidoPost: PedidoPost = new PedidoPost;

  constructor(private produtoService: ProdutosService, private snackBar: MatSnackBar,
    private carrinhoService: CarrinhoService, private pedidoService: PedidosService,
    private alertService: AlertService,private router: Router,)
  { }

  ngOnInit(): void {
    this.buscarProdutos();
  }

  // BUSCAR PRODUTOS
  buscarProdutos(): void {
    this.produtoService.buscarTodos()
      .subscribe({
        next: produtos => {
          this.produtos = produtos;
        },
        error: e => {
          console.log(e.error);
          const msg: string = "Erro obtendo produtos.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      })
  }

  // adicionarItem(produto){

  //  this.itens.push(produto);
  //  console.log(this.itens);

  //   window.alert('Produto adicionado ao carrinho');
  // }

  // adicionarItem(produto){
  //   console.log(this.itens);
  //   this.carrinhoService.addItem(produto);
  // }

  // items(){
  //   return this.carrinhoService.itens.length > 0 ? this.carrinhoService.itens.length : ""

  // }



  comprar() {

    this.pedidoPost.idCliente = 1;
    this.pedidoPost.idVendedor = 1;
    this.pedidoPost.situacao = 'PAGO';
    this.pedidoPost.desconto = 0.0;
    this.pedidoPost.itens = this.itens;

    this.pedidoService.cadastrarPedido(this.pedidoPost).subscribe({
      next: result => {
        this.onSucess(result)
      },
      error: e =>{
        this.onError(e)
      }
    });

  }

  private onSucess(result: Pedido) {
    this.alertService.success('Pedido realizado com sucesso.');
    this.router.navigate(['pedidos/pedido-detalhes/'+ result.idPedido]);
  }

  private onError(e: any) {
    this.alertService.error(e.error.message);
  }

  upQuantity(produto : Produto): void{

    this.itemPedido.quantidade ++;
    this.itemPedido.preco = produto.valorVenda;
    this.itemPedido.produto = produto;

    this.carrinhoService.addItem(this.itemPedido);

    console.log('Qtde:', this.itemPedido.quantidade);

  }

  downQuantity(produto : Produto): void{

    if(this.itemPedido.quantidade > 0){
      this.itemPedido.quantidade --;

      this.carrinhoService.addItem(this.itemPedido);
    }

    console.log('Qtde:', this.itemPedido.quantidade);

  }

  verificarQuantidade(itemPedidoPost : ItemPedidoPost, produto: Produto): void {

    // itemPedidoPost.idProduto = produto.idProduto;
    // console.log(itemPedidoPost);

    // this.carrinhoService.addItem(this.itemPedidoPost);


    if(itemPedidoPost.quantidade < 0) {
      alert("Quantidae é zero");
      itemPedidoPost.quantidade = 0;
    }
    else{
      itemPedidoPost.quantidade;

    }
  }


}



