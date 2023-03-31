import { Produto } from 'src/app/produtos/models/produto';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Fornecedor } from 'src/app/fornecedores/models/fornecedor';
import { FornecedoresService } from 'src/app/fornecedores/services/fornecedores.service';
import { AlertService } from 'src/app/util/services/alert.service';
import { ProdutosService } from './../../services/produtos.service';
import { ProdutoPost } from '../../models/produtoPost';

@Component({
  selector: 'app-produtos-cad',
  templateUrl: './produtos-cad.component.html',
  styleUrls: ['./produtos-cad.component.scss']
})
export class ProdutosCadComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private fornecedorService: FornecedoresService,
    private snackBar: MatSnackBar, private produtoService: ProdutosService, private alertService: AlertService)
  { }

  fornecedores: Fornecedor[] = [];
  foto: File;

  ngOnInit(): void {
    this.buscarFornecedores();
  }

  form = this.formBuilder.group({
    nomeProduto: [''],
    descricao: [''],
    ativo: [''],
    peso: [''],
    valorCusto: [''],
    valorVenda: [''],
    idFornecedor: ['']
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

  cadastrar() {
    let dadosProdutos = this.converterObjetoToJson(this.form.value);

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
  }

  private onError(e: any) {
    this.alertService.error(e.error.message);
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
