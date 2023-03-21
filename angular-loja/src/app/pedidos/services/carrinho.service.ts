import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemPedido } from '../models/itemPedido';
import { Pedido } from '../models/pedido';
import { ItemPedidoPost } from './../models/itemPedidoPost';
import { PedidoPost } from './../models/pedidoPost';



@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  // URL API WEB
  endpoint = environment.baseUrl + 'pedidos';

  constructor(private httpClient: HttpClient) { }

  private _itens: ItemPedido[] = [];


  private _itensPedido : BehaviorSubject<ItemPedido[]> = new BehaviorSubject(this._itens);

  public itens : Observable<ItemPedido[]> = this._itensPedido.asObservable();



  // addItem(item: ItemPedidoPost){
  //     this._itens.push(item)
  //     sessionStorage.setItem("cart",JSON.stringify(this._itens))
  //     console.log(this._itens);

  // }

  // removeItem(item: ItemPedidoPost){
  //     this._itens.splice(this._itens.indexOf(ItemPedidoPost), 1)
  //     //salva na sessão
  //     sessionStorage.setItem("cart",JSON.stringify(this._itens))
  //     console.log(this._itens);


  // }


  addItem(item: ItemPedido) {
    console.log("Ítem adicionado:", item);


    let index = this._itens.findIndex(b => b.produto.idProduto === item.produto.idProduto);
    if (index === -1) {
      this._itens.push(item);

    } else {
      this._itens[index].quantidade = item.quantidade;
      if (item.quantidade == 0) {
        this._itens.splice(index, 1);
      }
    }

    console.log("Lista:", this._itens);

  }

  // comprar() {

  //   this.pedidoPost.idCliente = 1;
  //   this.pedidoPost.idVendedor = 1;
  //   this.pedidoPost.situacao = 'PAGO';
  //   this.pedidoPost.desconto = 0.0;
  //   this.pedidoPost.itens = this.itens;

  //   this.pedidoService.cadastrarPedido(this.pedidoPost).subscribe({
  //     next: result => {
  //       this.onSucess(result)
  //     },
  //     error: e =>{
  //       this.onError(e)
  //     }
  //   });

  // }

  // total() :number{
  //     return this.itens
  //     .map(item => item.valorVenda)
  //     .reduce((prev, value)=> prev+value, 0)
  // }



    // CADASTRAR PEDIDO
    cadastrarPedido(pedidoPost: PedidoPost){


      let listaItemPost: ItemPedidoPost[] = [];

      this._itens.forEach(function (item) {

        let itemPedidoPost: ItemPedidoPost = new ItemPedidoPost;

        console.log(item);

        itemPedidoPost.quantidade = item.quantidade;
        itemPedidoPost.idProduto = item.produto.idProduto;


        listaItemPost.push(itemPedidoPost);

        console.log(listaItemPost);
        pedidoPost.itens = listaItemPost;

      });

      console.log(pedidoPost);

      return this.httpClient.post<Pedido>(this.endpoint, pedidoPost);
    }

}
