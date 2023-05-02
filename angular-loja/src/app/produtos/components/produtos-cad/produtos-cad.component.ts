import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Fornecedor } from 'src/app/fornecedores/models/fornecedor';
import { FornecedoresService } from 'src/app/fornecedores/services/fornecedores.service';
import { Produto } from 'src/app/produtos/models/produto';
import { AlertService } from 'src/app/util/services/alert.service';
import { CategoriasService } from '../../services/categorias.service';
import { ProdutosService } from './../../services/produtos.service';

@Component({
  selector: 'app-produtos-cad',
  templateUrl: './produtos-cad.component.html',
  styleUrls: ['./produtos-cad.component.scss']
})
export class ProdutosCadComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private fornecedorService: FornecedoresService, private categoriasService: CategoriasService,
    private snackBar: MatSnackBar, private produtoService: ProdutosService, private alertService: AlertService,
    private router: Router)
  { }

  fornecedores: Fornecedor[] = [];
  categorias = [];
  foto: File;

  // definindo um padrão incial das opções ATIVO e UNIDADE DE MEDIDA do formulário
  ativo: boolean = true;
  tipoPeso: string = 'g';

  ngOnInit(): void {
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
    idFornecedor: ['', [Validators.required]]
  });

  //Recebendo um evento/valor do componente FILHO
  onUpload(evento){
    console.log(evento);
    this.foto = evento;
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

  // CADASTRAR PRODUTOS
  cadastrar() {
    let dadosProdutos = this.converterObjetoToJson(this.form.value);
    console.log(typeof this.form.value.valorCusto);
    console.log( typeof this.form.value.valorVenda);



    this.produtoService.cadastrar(dadosProdutos, this.foto).subscribe({
      next: result => {
        this.onSuccess(result)
      },
      error: e => {
        this.onError(e);
      }
    });

  }

  cancelar(){
    history.go(-1);
  }

  /* ------------- M E N S A G E N S  -------------------------*/

  private onSuccess(result: Produto) {
    this.form.reset();
    this.alertService.success('Produto ' + result.nomeProduto+ ' cadastrado(a) com sucesso');
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
