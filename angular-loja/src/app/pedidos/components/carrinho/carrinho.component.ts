import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from '../../models/pedido';
import { CarrinhoService } from '../../services/carrinho.service';
import { AlertService } from './../../../util/services/alert.service';
import { ItemPedido } from './../../models/itemPedido';
import { ItemPedidoPost } from './../../models/itemPedidoPost';
import { PedidoPost } from './../../models/pedidoPost';
import { PedidosService } from './../../services/pedidos.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss']
})
export class CarrinhoComponent implements OnInit {

  constructor(private carrinhoService: CarrinhoService, private pedidoService: PedidosService,
     private alertService: AlertService, private router: Router) { }

  // ngOnInit() {
  //   //sessionStorage.removeItem("carrinho")
  //   let carrinhoSession = sessionStorage.getItem("carrinho");
  //   //carrinho não está vazio
  //   if(carrinhoSession != null){
  //     this.carrinhoService.itens = JSON.parse(carrinhoSession);
  //   }
  // }

  // itens(): Produto[] {

  //   return this.carrinhoService.itens;


  // }
  // removeItem(Produto){
  //   let c = this.carrinhoService.removeItem(Produto);
  // }

  // total() :number{
  //   return this.carrinhoService.total()
  // }


  itens : ItemPedido[] = [];

  lista: ItemPedidoPost[] = [];

  pedidoPost: PedidoPost = new PedidoPost;

  idCliente: number = 1;


  // items(){
  //   return this.carrinhoService.itens.length > 0 ? this.carrinhoService.itens.length : ""

  // }

  ngOnInit(): void {
     this.carrinhoService.itens.subscribe(data => this.itens = data);
     console.log(this.itens);

  }

  total(){
    let sum=0;
    this.itens.forEach(item => {
      sum += item.quantidade * item.preco;
    });

    return sum;
  }

  comprar() {


    console.log(this.itens);

    if(this.itens.length > 0){

      this.pedidoPost.idCliente = this.idCliente;
      this.pedidoPost.idVendedor = this.idCliente;
      this.pedidoPost.situacao = 'PAGO';
      this.pedidoPost.desconto = 0.0;
      this.pedidoPost.itens = this.lista;

      console.log(this.pedidoPost);


      this.carrinhoService.cadastrarPedido(this.pedidoPost).subscribe({
        next: result => {
          this.onSucess(result)
        },
        error: e =>{
          this.onError(e)
        }
      });


    }


  }

  private onSucess(result: Pedido) {
    this.alertService.success('Pedido realizado com sucesso.');
    this.router.navigate(['clientes/cliente-detalhes/'+ result.cliente.idCliente]);
  }

  private onError(e: any) {
    this.alertService.error(e.error.message);
  }

}
