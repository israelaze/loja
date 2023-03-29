import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Fornecedor } from 'src/app/fornecedores/models/fornecedor';
import { FornecedoresService } from 'src/app/fornecedores/services/fornecedores.service';

@Component({
  selector: 'app-produtos-cad',
  templateUrl: './produtos-cad.component.html',
  styleUrls: ['./produtos-cad.component.scss']
})
export class ProdutosCadComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private fornecedorService: FornecedoresService,
    private snackBar: MatSnackBar)
  { }

  form: FormGroup;
  fornecedores: Fornecedor[] = [];
  foto: File;


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nomeProduto: [''],
      descricao: [''],
      ativo: [''],
      peso: [''],
      valorCusto: [''],
      valorVenda: [''],
      foto: [''],
      fornecedor: ['']
    });

    this.buscarFornecedores();
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

  //Recebendo um evento/valor do componente FILHO
  onUpload(evento){

  }

  cadastrar(): void{

  }

  cancelar(): void{

  }

}
