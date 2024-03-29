import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Produto } from 'src/app/produtos/models/produto';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
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
    private vendedoresService: VendedoresService, private snackBar: MatSnackBar,
    public dialog: MatDialog
    )
  { }

  itensPedido : ItemPedido[] = [];
  qtdeProdutos: number = 0;
  cliente: Cliente;
  vendedores: Vendedor[] = [];

  lista: ItemPedidoPost[] = [];
  itemPedidoPost: ItemPedidoPost;
  pedidoPost: PedidoPost = new PedidoPost;
  valorDesconto = 0;

  temDesconto: boolean = false;
  descontoValido: boolean = true;

  produtosSession: Produto[] = [];

  // Formulário
  form1 = this._formBuilder.group({
    desconto: ['',]
  });

  // Formulário
  form2 = this._formBuilder.group({
    vendedor: ['', [Validators.required]],
    pagamento: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.buscarCarrinhoSession();
    this.buscarProdutosSession()
    this.buscarClienteSession();
    this.buscarVendedores();
  }

  // BUSCAR ÍTENS DO CARRINHO(sessão)
  buscarCarrinhoSession(): void{
    this.itensPedido = this.carrinhoService.buscarCarrinho();

    // if(this.itensPedido.length <= 0){
    //   this.router.navigate(['home']);
    // }
    console.log('Qtde de ítens no carrinho: ', this.itensPedido.length);
  }

  // BUSCAR PRODUTOS NÃO ADICIONADOS AO CARRINHO(sessão)
  buscarProdutosSession(): void{
    this.produtosSession = this.converterStringToObjeto(sessionStorage.getItem('produtosSession'));
    this.qtdeProdutos = this.produtosSession.length;

    console.log('Qtde de produtos disponíveis: ', this.qtdeProdutos);
  }

  // BUSCAR CLIENTE NA SESSÃO
  buscarClienteSession(): void {
    let clienteSession = this.converterStringToObjeto(sessionStorage.getItem('clienteSession'));
    this.cliente = clienteSession;

    console.log('Cliente: ', this.cliente.nome);
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
    this.pedidoPost.idVendedor = this.converterStringToNumber(this.form2.value.vendedor);
    this.pedidoPost.situacao = this.form2.value.pagamento;

    if(this.temDesconto){
      this.pedidoPost.desconto = this.converterStringToNumber(this.form1.value.desconto);
    }
    this.pedidoPost.itens = this.lista;
  }

  getErrorMessage(fieldName: string){

    const form1 = this.form1.get(fieldName);
    const form2 = this.form2.get(fieldName);

    if (form1?.hasError('required') || form2?.hasError('required')) {
      return 'Campo obrigatório';
    }
    return 'Inválido';
  }

  // Remover ítem do carrinho
  removeItem(item: ItemPedido): void{

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja excluir ' + item.produto.nomeProduto + ' ?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      console.log(result);

      if (result) {

        this.itensPedido.splice(this.itensPedido.indexOf(item), 1);
        console.log("Carrinho:", this.itensPedido);

        // salva o novo carrinho na sessão
        sessionStorage.setItem('carrinhoSession',JSON.stringify(this.itensPedido));

        // retornando com o produto para o catálogo
        this.produtosSession.push(item.produto);
        // atualizando o catálogo na sessão
        sessionStorage.setItem('produtosSession', JSON.stringify (this.produtosSession));

       // this.ngOnInit();
      }
    });

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

  // Quantidade atual do ítem
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

    soma = this.itensPedido
    .map(item => item.preco * item.quantidade)
    .reduce((prev, value) => prev+value, 0);

    this.descontoValido = true;

    if(this.temDesconto){
      this.valorDesconto = this.converterStringToNumber(this.form1.value.desconto);
    }else{
      this.valorDesconto = 0;
    }

   // console.log(this.valorDesconto);
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

  //Converte a string em number
  converterStringToNumber(valor: string): number{
    return +valor;
  }

  converterStringToObjeto(json: string): any{
    return JSON.parse(json);
  }

  voltar(){
    history.go(-1);
  }

}
