import { Login } from './../../../usuarios/models/login';
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

  constructor(private produtosService: ProdutosService,
    private snackBar: MatSnackBar,
    private carrinhoService: CarrinhoService,
    private clientesService: ClientesService,
    private route: ActivatedRoute,
    private router: Router)
  {}

  //atributo para guardar o parâmetro recebido na rota
  parametro = this.route.snapshot.paramMap.get('id');
  cliente: Cliente = new Cliente;
  produtos: Produto[] = [];
  itens: ItemPedido[] = [];
  carrinhoSession: ItemPedido[] = [];
  produtosSession: Produto[] = [];

  ngOnInit(){

    this.buscarCliente(this.converterStringToNumber(this.parametro));
    this.buscarProdutos();
  }

  // BUSCAR cliente por id
  buscarCliente(idCliente: number): void {

    console.log(this.parametro);
    console.log(typeof idCliente);



    // verificando se o cliente da sessão é o mesmo do parâmetro da requisição
    let clienteSession =  this.converterJsonToObjeto(sessionStorage.getItem('clienteSession'));
    if(clienteSession!= null && clienteSession.idCliente != idCliente){
      //limpando a sessão
      sessionStorage.clear();
    }

    this.clientesService.buscarId(idCliente).subscribe({
      next: cliente => {
        this.cliente = cliente;

        // salvando um novo Cliente na sessão
        sessionStorage.setItem('clienteSession', this.converterObjetoToJson(this.cliente));
      },
      error: e => {
        //recebendo a mesagem de erro da API
        console.log(e.error.message);

        this.router.navigate(['clientes/clientes-lista']);
        const msg: string = e.error.message;
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      }
    })
  }

  // Buscar todos os produtos
  buscarProdutos(): void {

    let sessao = this.buscarSessao();
    console.log('Ítens no carrinho?:', sessao);

    if(sessao){
      this.produtos = this.produtosSession;
      this.itens = this.carrinhoSession;

    }else{
      this.produtosService.buscarTodos().subscribe({
        next: produtos => {
          this.produtos = produtos;

          this.produtos.forEach(produto => {
            if(produto.foto){

              let foto = 'data:image/jpeg;base64,' + produto.foto;
              console.log(foto);

              produto.foto = foto;
            }
          });
        },
        error: e => {
          console.log(e.error);
          const msg: string = 'Erro obtendo produtos.';
          this.snackBar.open(msg, 'Erro', { duration: 5000 });
        }
      });
    }
  }

  // Buscar dados na sessão
  buscarSessao(): boolean {
    this.carrinhoSession = this.converterJsonToObjeto(sessionStorage.getItem('carrinhoSession')) ;
    this.produtosSession = this.converterJsonToObjeto(sessionStorage.getItem('produtosSession'));

    if(this.carrinhoSession != null && this.produtosSession != null){
      return true;
    }
    return false;
  }

  // Adicionar produto ao carrinho
  adicionar(produto: Produto): void {

    let itemPedido = new ItemPedido;

    itemPedido.produto = produto;
    itemPedido.preco  = produto.valorVenda;
    itemPedido.quantidade = 1;
 //   this.carrinhoService.addItem(itemPedido);

    window.alert('Produto: ' + produto.nomeProduto + ' adicionado ao carrinho com sucesso.');

    // adiciona o ítem numa lista de ItemPedido e salva na sessão
    this.itens.push(itemPedido);
    sessionStorage.setItem('carrinhoSession', this.converterObjetoToJson(this.itens));

    // removendo o produto da lista de exibição e salva na sessão, os produtos NÃO ADICIONADOS ao carrinho
    this.produtos.splice(this.produtos.indexOf(produto), 1);
    sessionStorage.setItem('produtosSession', this.converterObjetoToJson(this.produtos));

  }

  /* ---------------------- C O N V E R S O R E S  ----------------------*/

  converterStringToNumber(parametro: string): number {
    return +parametro;
  }

  converterJsonToObjeto(json: string): any{
    return JSON.parse(json);
  }

  converterObjetoToJson(objeto: any): string{
    return JSON.stringify(objeto);
  }

}
