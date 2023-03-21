import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
    private alertService: AlertService, private router: Router, private _formBuilder: FormBuilder)
  { }

  itens : ItemPedido[] = [];
  lista: ItemPedidoPost[] = [];
  pedidoPost: PedidoPost = new PedidoPost;

  valorDesconto: number = 0;
  idCliente: number = 1;
  temDesconto: boolean = false;
  checked = true;

  // Capturando valor do desconto
  desconto = this._formBuilder.group({

    valor: [''],
  });

  //Busca uma lista de ítens de pedido
  ngOnInit(): void {
    this.carrinhoService.itens.subscribe(data => this.itens = data);
  }

  //Calcula o total do pedido com ou sem desconto
  total(){
    let sum=0;
    this.itens.forEach(item => {
      sum += item.quantidade * item.preco;
    });

   if(this.temDesconto){
     this.conversor(this.desconto.value.valor);

   }else{
    this.valorDesconto = 0;
   }

   sum = sum - this.valorDesconto;

   if(sum < 0 ){
    this.checked = false;
   }else{
    this.checked = true;
     return  sum;
   }

   return sum;

  }

  //Converte a string em number
  conversor(valor: string){
   this.valorDesconto = +valor;
  }

  // Cria um novo pedido
  confirmar() {

    if(this.itens.length > 0){

      this.pedidoPost.idCliente = this.idCliente;
      this.pedidoPost.idVendedor = this.idCliente;
      this.pedidoPost.situacao = 'PAGO';
      this.pedidoPost.desconto = this.valorDesconto;
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
