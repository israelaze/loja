import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ItemPedido } from '../models/itemPedido';
import { Pedido } from './../models/pedido';
import { PedidoPost } from './../models/pedidoPost';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  constructor(private httpClient: HttpClient) { }

  // URL API WEB
  endpoint = environment.baseUrl + 'pedidos';

  // Recebe os itens adicionados ao carrinho
 // itens: ItemPedido[] = [];

  //Adiciona um ítem ao carrinho e salva os ítens na sessão
  // addItem(item: ItemPedido){
  //   this.itens.push(item);
  //   sessionStorage.setItem("carrinhoSession",JSON.stringify(this.itens))
  //   console.log("Qtde de produtos no carrinho:", this.itens.length);
  // }

  // removeItem(ItemPedido){
  //   this.itens.splice(this.itens.indexOf(ItemPedido), 1)
  //   //salva na sessão
  //   sessionStorage.setItem("carrinho",JSON.stringify(this.itens))
  //   console.log("Lista:", this.itens);
  // }

  // BUSCAR CARRINHO
  buscarCarrinho(): ItemPedido[]{

    // captura o carrinhoSession e converte em uma lista de ItemPedio
    return this.converterJsonToObjeto(sessionStorage.getItem('carrinhoSession'));
  }

  // ADICIONAR PEDIDO
  cadastrarPedido(pedidoPost: PedidoPost){
    return this.httpClient.post<Pedido>(this.endpoint, pedidoPost);
  }

  converterJsonToObjeto(json: string): any{
    return JSON.parse(json);
  }

}
