import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FornecedoresService } from 'src/app/fornecedores/services/fornecedores.service';
import { AlertService } from 'src/app/util/services/alert.service';
import { Produto } from '../../models/produto';
import { ProdutoPut } from '../../models/produtoPut';
import { CategoriasService } from '../../services/categorias.service';
import { Fornecedor } from './../../../fornecedores/models/fornecedor';
import { ProdutosService } from './../../services/produtos.service';

@Component({
  selector: 'app-produto-update',
  templateUrl: './produto-update.component.html',
  styleUrls: ['./produto-update.component.scss']
})
export class ProdutoUpdateComponent implements OnInit{

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder,
    private router: Router, private snackBar: MatSnackBar, private produtosService: ProdutosService,
    private alertService: AlertService, private fornecedorService: FornecedoresService, private categoriasService: CategoriasService )
  {}

  // atributo para guardar o parâmetro recebido na rota
  parametro = this.route.snapshot.paramMap.get('id');

  // recebe a foto do produto para exibição
  imagem: string = '';

  // recebe um novo arquivo para atualizar o produto
  foto: File;

  produto: Produto = new Produto;
  fornecedores: Fornecedor[] = [];
  fornecedor: Fornecedor = new Fornecedor;
  categorias = [];

  // EXECUTA QUANDO O COMPONENTE É CARREGADO
  ngOnInit(): void {
    // converter STRING => NUMBER.
    this.produto.idProduto = this.converterStringToNumber(this.parametro);

    // busca automática ao iniciar o componente
    this.buscarId(this.produto.idProduto);
    this.buscarFornecedores();
    this.buscarCategorias();
  }

  form = this.formBuilder.group({
    nomeProduto: ['', [Validators.required]],
    descricao: [''],
    ativo: [''],
    peso: [''],
    tipoPeso: [''],
    valorCusto: [''],
    valorVenda: [''],
    categoria: [''],
    fornecedor: ['', [Validators.required]]
  });

  // BUSCAR ID
  buscarId(idProduto: number): void {
    this.produtosService.buscarId(idProduto).subscribe({
      next: result => {
        this.produto = result;
        this.fornecedor = this.produto.fornecedor;

        if(this.produto.foto){
          this.imagem = 'data:image/jpeg;base64,' + this.produto.foto;
        }
      },
      error: e => {
        console.log(e.error.message);

        this.router.navigate(['produtos/produtos-lista']);
        const msg: string = e.error.message;
        this.snackBar.open(msg, "Erro", { duration: 5000 });
      }
    })
  }

  // BUSCAR FORNECEDORES
  buscarFornecedores(): void {
    this.fornecedorService.buscarTodos()
      .subscribe({
        next: fornecedores => {
          this.fornecedores = fornecedores;
        },
        error: e => {
          console.log(e.error);
          const msg: string = "Erro obtendo fornecedores.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      })
  }

  // BUSCAR CATEGORIAS
  buscarCategorias(): void {
    this.categoriasService.buscarCategorias()
      .subscribe({
        next: result => {
          this.categorias = result as [];
        },
        error: e => {
          console.log(e.error);
          const msg: string = "Erro obtendo categorias.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      })
  }

  //Recebendo um evento/valor do componente FILHO para Atualizar
  onUpload(evento) {

   // this.step.stepControl.status = "VALID";

    if (evento == 'cancelar') {

     // console.log(this.step.stepControl.status);
      console.log("Cancelar");

    } else if (evento == 'erro') {

    //  this.step.stepControl.status = "INVALID";
      console.log("Erro");

    //  console.log(this.step.stepControl.status);

    } else {

      this.foto = evento;
    //  this.step.stepControl.status = "VALID";

      console.log('Arquivo recebido:', this.foto, typeof evento);
    }
  }

  // ATUALIZAR
  atualizar(): void {

   const dados = this.formPut();
    // converte o clientePut(JSON) em uma String
    var dadosProduto = JSON.stringify(dados);

    console.log(dadosProduto);


    this.produtosService.atualizar(dadosProduto, this.foto).subscribe({
      next: result => {
        this.onSuccess(result)
      },
      error: e => {
        this.onError(e)
      }
    });
  }

  private onSuccess(result: Produto) {
    this.form.reset();
    this.alertService.success('Produto ' + result.nomeProduto+ ' atualizado com sucesso');
    this.router.navigate(['produtos/produto-detalhes/'+ result.idProduto]);

  }

  private onError(e: any) {
    this.alertService.error(e.error.message);
  }

  getErrorMessage(fieldName: string){

    const form = this.form.get(fieldName);

    if (form?.hasError('required')) {
      return 'Campo obrigatório';
    }
    return 'Inválido';
  }

  formPut(): ProdutoPut{

    let produtoPut: ProdutoPut = new ProdutoPut;

    console.log(this.form.value.ativo, typeof this.form.value.ativo);

    produtoPut.idProduto = this.produto.idProduto;
    produtoPut.nomeProduto = this.form.value.nomeProduto;
    produtoPut.peso = this.form.value.peso;
    produtoPut.tipoPeso = this.form.value.tipoPeso;
    produtoPut.valorCusto = this.converterStringToNumber(this.form.value.valorCusto);
    produtoPut.valorVenda = this.converterStringToNumber(this.form.value.valorVenda);
    produtoPut.categoria = this.form.value.categoria;
    produtoPut.descricao = this.form.value.descricao;
    produtoPut.idFornecedor = this.converterStringToNumber(this.form.value.fornecedor);
    produtoPut.ativo = this.form.value.ativo as any;

    console.log(produtoPut);

    return produtoPut;
  }

  cancelar(): void{
    history.go(-1);
  }


  /* ------------- C O N V E R S O R E S  -------------------------*/

  converterStringToNumber(valor: string): number{
    return +valor;
  }

  converterJsonToObjeto(json: string): any{
    return JSON.parse(json);
  }

  converterObjetoToJson(objeto: any): string{
    return JSON.stringify(objeto);
  }

}
