import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStep, StepperOrientation } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EnderecoService } from 'src/app/shared/services/endereco.service';
import { AlertService } from 'src/app/util/services/alert.service';
import { EstadosService } from 'src/app/util/services/estados.service';
import { ClientesService } from '../../services/clientes.service';
import { Cliente } from './../../models/cliente';
import { ClientePost } from './../../models/cliente-post';


@Component({
  selector: 'app-clientes-cad',
  templateUrl: './clientes-cad.component.html',
  styleUrls: ['./clientes-cad.component.scss']
})
export class ClientesCadComponent implements OnInit {

  opcional = true;
  isLinear = true;
  stepperOrientation: Observable<StepperOrientation>;

  clientePost: ClientePost = new ClientePost;
  estados = [];

  maxBirthday = new Date();

  foto: File;

  // manipulando o MatStep
  @ViewChild('step1') step: MatStep;
  @ViewChild('stepEndereco') stepEndereco: MatStep;

  constructor(
    private _formBuilder: FormBuilder,
    private clienteService: ClientesService,
    private alertService: AlertService,
    private router: Router,
    private estadoService: EstadosService,
    private snackBar: MatSnackBar,
    private breakpointObserver: BreakpointObserver,
    private enderecoService: EnderecoService)
    { this.stepperOrientation = this.breakpointObserver
    .observe('(min-width: 868px)')
    .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  dados = this._formBuilder.group({

    nome: ['Teste teste',
      //torna o campo obrigatório
      [Validators.required,
      //Regex para duas strings, separadas com espaço e com no mínimo 3 caracteres cada. Aceita acentuação e rejeita números.
      Validators.pattern(/\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/)
      ]
    ],
    cpf: ['12341233302',
      [Validators.required, Validators.minLength(11),
      Validators.pattern('^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$')
      ]
    ],
    dataNascimento: [null,[]]
  });

  contatos  = this._formBuilder.group({
    telefone1: ['26977022',
      [Validators.required,
      Validators.pattern (/^[0-9]{8,11}$/),
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
    logradouro: [null, [Validators.required, Validators.pattern(/^([a-zA-Z]{0,1})/)]],
    numero: [null, [Validators.required, Validators.pattern('^[0-9]{1,6}'),]],
    complemento: [ null, [Validators.pattern(/^([a-zA-Z]{0,1})/)]],
    condominio: [null, [Validators.pattern(/^([a-zA-Z]{0,1})/)]],
    bairro: [null, [Validators.pattern(/^([a-zA-Z]{0,1})/)]],
    municipio: [null, [Validators.pattern(/^([a-zA-Z]{0,1})/)]],
    estado: [null],
    // aceita traço
    cep: [null, [Validators.pattern(/^(\d{5}|\d{5}\-?\d{3})$/), Validators.minLength(8)]]
    //cep: ['26574640', [Validators.pattern(/^[0-9]{8}$/)]]
  });

  observacoes  = this._formBuilder.group({
    observacao: [null],
  });

  ngOnInit(): void {
    this.buscarEstados();
  }

  buscarEstados(): void{
    this.estadoService.buscarEstados().subscribe({
      next: result => {
        this.estados = result as any;
        console.log(this.estados);
      },
      error: e => {
        this.snackBar.open('Erro ao buscar os estados brasileiros.', '', { duration: 5000 });
      }
    })
  }

  //Recebendo um evento/valor do componente FILHO
  onUpload(evento){

    this.step.stepControl.status = "VALID";

    if(evento == 'cancelar' ){

      console.log(this.step.stepControl.status);
      console.log("Cancelar");

    }else if(evento == 'erro'){

      this.step.stepControl.status = "INVALID";
      console.log("Erro");

      console.log(this.step.stepControl.status);

    }else{

      this.foto = evento;
      this.step.stepControl.status = "VALID";

      console.log('Arquivo recebido:', this.foto, typeof evento);
    }
  }

  consultaCEP(){

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

    // converte os dados do formulário em um CLientePost(JSON)
    this.formPost(this.dados.value, this.contatos.value, this.endereco.value, this.observacoes.value);

    // converte o clientePost(JSON) em uma String
    var dadosCliente = JSON.stringify(this.clientePost);

    this.clienteService.cadastrar(dadosCliente, this.foto).subscribe({
      next: result => {
        this.onSuccess(result);
        this.router.navigate(['clientes/cliente-detalhes/'+ result.idCliente]);

      },
      error: e => {
        this.onError(e)
      }
    });
  }

  formPost(
    value: Partial<{ nome: string; cpf: string; dataNascimento: string; }>,
    value1: Partial<{ telefone1: string; telefone2: string; email: string; }>,
    value2: Partial<{ logradouro: string; numero: string; complemento: string; condominio: string; bairro: string; municipio: string; estado: string; cep: string; }>,
    value3: Partial<{ observacao: string; }>
    ) {

    this.clientePost.nome = value.nome;
    this.clientePost.cpf = value.cpf;
    this.clientePost.dataNascimento = value.dataNascimento;
    this.clientePost.telefone1 = value1.telefone1;
    this.clientePost.telefone2 = value1.telefone2;
    this.clientePost.email = value1.email;
    this.clientePost.logradouro = value2.logradouro;
    this.clientePost.numero = value2.numero;
    this.clientePost.complemento = value2.complemento;
    this.clientePost.condominio = value2.condominio;
    this.clientePost.bairro = value2.bairro;
    this.clientePost.municipio = value2.municipio;
    this.clientePost.estado = value2.estado;
    this.clientePost.cep = value2.cep;
    this.clientePost.observacao = value3.observacao;
  }

  private onSuccess(result: Cliente) {
    this.alertService.success('Cliente ' + result.nome+ ' cadastrado(a) com sucesso');
  }

  private onError(e: any) {
    this.alertService.error(e.error.message);
  }

  getErrorMessage(fieldName: string) {
    console.log(fieldName);

    const dados = this.dados.get(fieldName);
    const contatos = this.contatos.get(fieldName);
    const endereco = this.endereco.get(fieldName);

    if (dados?.hasError('required') || contatos?.hasError('required') || endereco?.hasError('required')) {
      return 'Campo obrigatório';

    }else if (dados?.hasError('minlength') || contatos?.hasError('minlength') || endereco?.hasError('minlength')) {

      if(fieldName == 'cpf'){
        console.log(fieldName);
        return 'O cpf deve conter no mínimo 11 caracteres numéricos';
      }

      if(fieldName == 'telefone1' || fieldName == 'telefone2'){
        console.log(fieldName);
        return 'O telefone deve conter entre 8 e 11 caracteres sem espaços e com o DDD';
      }


      if(fieldName == 'cep'){
        console.log(fieldName);
        return 'Cep deve conter 8 caracteres sem traço.';
      }
    }else if (dados?.hasError('pattern') || contatos?.hasError('pattern')|| endereco?.hasError('pattern')) {

      if(fieldName == 'telefone1' || fieldName == 'telefone2'){
        console.log(fieldName);
        return 'O telefone deve conter entre 8 e 11 caracteres sem espaços e com o DDD';
      }

      if(fieldName == 'cpf'){
        console.log(fieldName);
        return 'O cpf deve conter no mínimo 11 caracteres numéricos. Sem letras';
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

      return 'Informe nome e sobrenome. Não deve conter números';
    }

    return 'Campo Inválido';
  }

}


