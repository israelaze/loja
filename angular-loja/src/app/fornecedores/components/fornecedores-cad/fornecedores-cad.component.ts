import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStep, StepperOrientation } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Estados } from 'src/app/util/models/estados';
import { AlertService } from 'src/app/util/services/alert.service';
import { EstadosService } from 'src/app/util/services/estados.service';
import { Fornecedor } from '../../models/fornecedor';
import { FornecedorPost } from '../../models/fornecedorPost';
import { FornecedoresService } from '../../services/fornecedores.service';
import { EnderecoService } from 'src/app/shared/services/endereco.service';

@Component({
  selector: 'app-fornecedores-cad',
  templateUrl: './fornecedores-cad.component.html',
  styleUrls: ['./fornecedores-cad.component.scss']
})
export class FornecedoresCadComponent implements OnInit {

  opcional = true;
  isLinear = true;
  stepperOrientation: Observable<StepperOrientation>;

  fornecedorPost: FornecedorPost = new FornecedorPost;
  estados: Estados[];

  foto: File;

  @ViewChild('step1') step: MatStep;
  @ViewChild('stepEndereco') stepEndereco: MatStep;

  constructor(
    private _formBuilder: FormBuilder,
    private fornecedorService: FornecedoresService,
    private alertService: AlertService,
    private router: Router,
    private estadoService: EstadosService,
    private snackBar: MatSnackBar,
    private breakpointObserver: BreakpointObserver,
    private enderecoService: EnderecoService)
    { this.stepperOrientation = breakpointObserver
    .observe('(min-width: 868px)')
    .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  dados = this._formBuilder.group({

    nomeFornecedor: ['Teste',
      //torna o campo obrigatório
      [Validators.required,
      //Regex Aceita até 7 palavras, podendo conter acento, e com espaço entre elas
      Validators.pattern(/^(([a-zA-Zà-ùÀ-Ù]+)(\ )?){0,7}$/),
      ]
    ],
    cpfCnpj: ['33333333333333',
      [Validators.required,
      Validators.pattern (/^[0-9]{11,14}$/),
     // Validators.pattern(/^(\d{3})(\d{3})(\d{3})(\d{2}$)$|^(\d{2})(\d{3})(\d{3})([0-1]{4})(\d{2})$/)
      ]
    ],
    telefone1: ['26977022',
      [Validators.required,
      Validators.pattern (/^[0-9]{8,11}$/)
     // Validators.pattern (/^\(?\d{2}\)?[\s-]?\d{5}-?\d{4}$/),
      ]
    ],
    telefone2: [null, [Validators.pattern (/^[0-9]{8,11}$/)]],
    email: [null,
      [Validators.email,
        Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3,3})+$/)]
    ]
  });

  endereco  = this._formBuilder.group({
    logradouro: ['São josé', [Validators.required, Validators.pattern(/^([a-zA-Z]{0,1})/)]],
    numero: [null, [Validators.required, Validators.pattern('^[0-9]{1,6}')]],
    complemento: [ null, [Validators.pattern(/^([a-zA-Z]{0,1})/)]],
    condominio: [null, [Validators.pattern(/^([a-zA-Z]{0,1})/)]],
    bairro: [null, [Validators.pattern(/^([a-zA-Z]{0,1})/)]],
    municipio: [null, [Validators.pattern(/^([a-zA-Z]{0,1})/)]],
    estado: [null],
    // aceita traço
    cep: [null, [Validators.pattern(/^(\d{5}|\d{5}\-?\d{3})$/)]]
  });

  ngOnInit(): void {
    this.buscarEstados();

  }

  buscarEstados(): void{
    this.estadoService.buscarEstados().subscribe({
      next: result => {
        this.estados = result as any;
      },
      error: e => {
        this.snackBar.open('Erro ao buscar os estados brasileiros.', '', { duration: 5000 });
      }
    })
  }

  consultaCEP(){
    console.log(this.stepEndereco.stepControl.status);


    const cep = this.endereco.get('cep').value;
   // console.log(cep);

    if(cep != "" && cep != null){
      this.enderecoService.buscarEnderecoAPI(cep).subscribe({
        next: result => {
          console.log(result);

          if(result.cep != null){
         //   console.log(this.stepEndereco.stepControl.status);
            this.populaDadosForm(result);

          }else{
            this.populaDadosForm(result);
            this.stepEndereco.stepControl.status =  'INVALID';
            this.alertService.error('CEP inválido. Tente novamente.');
          }
        },
        error: e => {
          this.snackBar.open('Erro ao buscar o endereço pelo CEP.', '', { duration: 5000 });
        }
      });
    }
  }

  populaDadosForm(dados: any) {
    // this.formulario.setValue({});
    console.log(dados);

    this.endereco.patchValue({

      logradouro: dados.logradouro,
      complemento: dados.complemento,
      bairro: dados.bairro,
      municipio: dados.municipio,
      estado: dados.estado
    });

   // this.formulario.get('nome').setValue('Loiane');

  }

  cadastrar() {

    // converte os dados do formulário em um FornecedorPost
    this.formPost();

    this.fornecedorService.cadastrar(this.fornecedorPost).subscribe({
      next: result => {
        this.onSuccess(result);
        this.router.navigate(['fornecedores/fornecedores-lista']);
       // this.router.navigate(['fornecedores/fornecedor-detalhes/'+ result.idFornecedor]);
      },
      error: e => {
        this.onError(e)
      }
    });
  }

  formPost() {

    this.fornecedorPost.nomeFornecedor = this.dados.value.nomeFornecedor;
    this.fornecedorPost.cpfCnpj = this.dados.value.cpfCnpj;
    this.fornecedorPost.telefone1 = this.dados.value.telefone1;
    this.fornecedorPost.telefone2 = this.dados.value.telefone2;
    this.fornecedorPost.email = this.dados.value.email;

    this.fornecedorPost.logradouro = this.endereco.value.logradouro;
    this.fornecedorPost.numero = this.endereco.value.numero;
    this.fornecedorPost.complemento = this.endereco.value.complemento;
    this.fornecedorPost.condominio = this.endereco.value.condominio;
    this.fornecedorPost.bairro = this.endereco.value.bairro;
    this.fornecedorPost.municipio = this.endereco.value.municipio;
    this.fornecedorPost.estado = this.endereco.value.estado;
    this.fornecedorPost.cep = this.endereco.value.cep;
  }

  private onSuccess(result: Fornecedor) {
    this.alertService.success('Fornecedor ' + result.nomeFornecedor+ ' cadastrado(a) com sucesso');
    //this.router.navigate(['fornecedores/fornecedor-detalhes/'+ result.idCliente]);
  }

  private onError(e: any) {
    this.alertService.error(e.error.message);
  }

  getErrorMessage(fieldName: string) {

    const dados = this.dados.get(fieldName);
    const endereco = this.endereco.get(fieldName);

    if (dados?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (dados?.hasError('pattern') || endereco?.hasError('pattern')) {

      if(fieldName == 'cpfCnpj'){
        console.log(fieldName);
        return 'Mínimo de 11 e máximo de 14 caracteres numéricos';
      }

      if(fieldName == 'telefone1'){
        console.log(fieldName);
        return 'O telefone deve conter entre 8 e 11 caracteres sem espaços e com o DDD';
      }

      if(fieldName == 'telefone2'){
        console.log(fieldName);
        return 'O telefone deve conter entre 8 e 11 caracteres sem espaços e com o DDD';
      }

      if(fieldName == 'email'){
        console.log(fieldName);
        return 'Email inválido';
      }

      if(fieldName == 'logradouro' || fieldName == 'numero'
        || fieldName == 'cep' || fieldName == 'complemento'
        || fieldName == 'condominio' || fieldName == 'bairro' || fieldName == 'municipio'){
        console.log(fieldName);
        return 'Não pode conter espaços vazios';
      }

      return 'Informe nomeFornecedor e sobrenome';
    }

    return 'Campo Inválido';
  }


}
