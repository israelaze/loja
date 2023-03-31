import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Pedido } from '../../models/pedido';
import { CarrinhoService } from '../../services/carrinho.service';
import { Cliente } from './../../../clientes/models/cliente';
import { AlertService } from './../../../util/services/alert.service';
import { Vendedor } from './../../../vendedores/models/vendedor';
import { VendedoresService } from './../../../vendedores/services/vendedores.service';
import { ItemPedido } from './../../models/itemPedido';
import { ItemPedidoPost } from './../../models/itemPedidoPost';
import { PedidoPost } from './../../models/pedidoPost';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss']
})
export class CarrinhoComponent implements OnInit {

  constructor(private carrinhoService: CarrinhoService, private alertService: AlertService,
    private router: Router, private _formBuilder: FormBuilder,
    private vendedoresService: VendedoresService, private snackBar: MatSnackBar)
  { }

  cliente: Cliente;
  itensPedido : ItemPedido[] = [];
  lista: ItemPedidoPost[] = [];
  itemPedidoPost: ItemPedidoPost;
  pedidoPost: PedidoPost = new PedidoPost;
  vendedores: Vendedor[] = [];
  valorDesconto: number = 0;

  temDesconto: boolean = false;
  temVendedor: boolean = false;
  descontoValido = true;

  qtdeProdutos: number = 0;

  // Formulário
  form = this._formBuilder.group({
    desconto: [''],
    vendedor: ['', [Validators.required]],
    pagamento: ['', [Validators.required]]
  });


  ngOnInit(): void {

    // captura o carrinho da sessão(Json)
    let carrinhoSession = sessionStorage.getItem('carrinhoSession');
    if(carrinhoSession !=null){
      console.log('kk');

      this.carrinhoService.itens = this.converterStringToObjeto(carrinhoSession);
     // this.itens();
    }else{
      this.router.navigate(['home']);
    }

    let produtosSession = this.converterStringToObjeto(sessionStorage.getItem('produtosSession'));
    this.qtdeProdutos = produtosSession.length;


    // captura o cliente da sessão(Json)
    let clienteSession = sessionStorage.getItem('clienteSession');
    this.cliente = this.converterStringToObjeto(clienteSession);
    this.buscarVendedores();
  }

  itens(): ItemPedido[]{
    this.itensPedido = this.carrinhoService.itens;
    console.log(this.itensPedido);

    if(this.temDesconto){

      this.valorDesconto = this.converterStringToNumber(this.form.value.desconto);
    }else{
      this.valorDesconto = 0;
    }

    if(this.form.value.vendedor != ''){
      this.temVendedor = true;
    }

    return this.itensPedido;
  }

  //Converte a string em number
  converterStringToNumber(valor: string): number{
    return +valor;
  }

  converterStringToObjeto(json: string): any{
    return JSON.parse(json);
  }

  // Cria um novo pedido
  confirmar(): void {

    if(this.itensPedido.length > 0){

      this.criarPedidoPost();

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
    sessionStorage.removeItem('carrinhoSession');
  }

  private onError(e: any) {
    this.alertService.error(e.error.message);
  }

  criarPedidoPost(): void{

    this.itensPedido.forEach(item => {
      this.itemPedidoPost = new ItemPedidoPost;
      this.itemPedidoPost.idProduto = item.produto.idProduto;
      this.itemPedidoPost.quantidade = item.quantidade;

      this.lista.push(this.itemPedidoPost);
    });

    this.pedidoPost.idCliente = this.cliente.idCliente;
    this.pedidoPost.idVendedor = this.converterStringToNumber(this.form.value.vendedor);
    this.pedidoPost.situacao = this.form.value.pagamento;

    if(this.temDesconto){
      this.pedidoPost.desconto = this.converterStringToNumber(this.form.value.desconto);
    }
    this.pedidoPost.itens = this.lista;
  }

  // BUSCAR VENDEDORES
  buscarVendedores(): void {
    this.vendedoresService.buscarTodos()
      .subscribe({
        next: vendedores => {
          this.vendedores = vendedores;
        },
        error: e => {
          console.log(e.error);
          const msg: string = "Erro obtendo vendedores.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
    })
  }

  getErrorMessage(fieldName: string){

    const form1 = this.form.get(fieldName);

    if (form1?.hasError('required')) {
      return 'Campo obrigatório';
    }
    return 'Inválido';
  }

  // Remover ítem do carrinho
  removeItem(item: ItemPedido): void{
    return this.carrinhoService.removeItem(item);
  }

  // Aumenta a quantidade
  upQuantity(itemPedido : ItemPedido): void{
    itemPedido.quantidade ++;
  }

  // Diminui a quantidade
  downQuantity(itemPedido : ItemPedido): void{
    if(itemPedido.quantidade > 1){
      itemPedido.quantidade --;
    }
  }

  verificarQuantidade(itemPedido : ItemPedido): void {
    if(itemPedido.quantidade < 1) {
      alert('Quantidade mínima do produto é 1.');
      itemPedido.quantidade = 1;
    }
    else{
      itemPedido.quantidade;
    }
  }

  //Calcula o total do pedido com ou sem desconto
  total() : number{
    let soma : number = 0;
    soma = this.carrinhoService.total();

    this.descontoValido = true;

    if(this.valorDesconto > soma){
      this.descontoValido = false;
    }
    return soma - this.valorDesconto;
  }

  // Subtotal
  subTotal(item: ItemPedido): number{
    let sum = 0;
    sum = item.quantidade * item.preco;

    return sum;
  }

  voltar(){
    history.go(-1);
  }

}
