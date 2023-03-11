import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStep, StepperOrientation } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cliente } from 'src/app/clientes/models/cliente';
import { ClientesService } from 'src/app/clientes/services/clientes.service';
import { Endereco } from 'src/app/shared/models/endereco';
import { AlertService } from 'src/app/util/services/alert.service';
import { EstadosService } from 'src/app/util/services/estados.service';
import { Estados } from '../../../util/models/estados';
import { ClientePut } from './../../models/cliente-put';


@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.scss']
})
export class ClienteUpdateComponent implements OnInit {

  // VARIÁVEIS
  opcional = true;
  isLinear = true;
  stepperOrientation: Observable<StepperOrientation>;
  cliente: Cliente = new Cliente;
  enderecoGet: Endereco = new Endereco;
  clientePut: ClientePut = new ClientePut;
  estados: Estados[];
  maxBirthday = new Date();

  // recebe a foto do cliente para exibição
  imagem: string = '';

  // recebe um novo arquivo para atualizar o cliente
  foto: File;

  // manipulando o MatStep
  @ViewChild('step1') step: MatStep;

  // atributo para guardar o parâmetro recebido na rota
  parametro = this.route.snapshot.paramMap.get('id');

  // INJEÇÃO DE DEPENDÊNCIA
  constructor(
    private clientesService: ClientesService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private estadosService: EstadosService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private breakpointObserver: BreakpointObserver
  ){
    this.stepperOrientation = this.breakpointObserver
    .observe('(min-width: 868px)')
    .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  dados = this._formBuilder.group({
    nome: ['',
      //torna o campo obrigatório
      [Validators.required,
      //Regex para duas strings, separadas com espaço e com no mínimo 3 caracteres cada. Aceita acentuação e rejeita números.
      Validators.pattern(/\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/),
      ]
    ],
    dataNascimento: ['',[]], /*IMPORTANTE: NECESSÁRIO VALIDAR A DATA  */
  });

  contatos  = this._formBuilder.group({
    telefone1: ['',
      [Validators.required,
      Validators.pattern (/^[0-9]{8,11}$/)
      // Validators.pattern (/^\(?\d{2}\)?[\s-]?\d{5}-?\d{4}$/),

      ]
    ],
    telefone2: ['', [Validators.pattern (/^[0-9]{8,11}$/)]],
    email: ['',
      [Validators.email,
        Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3,3})+$/)]
    ],
  });

  endereco  = this._formBuilder.group({
    logradouro: ['', [Validators.pattern(/^([a-zA-Z]{0,1}[a-zA-Z]{1,}'?-?[a-zA-Z]\s?([a-zA-Z]{1,})?)/)]],
    numero: ['', [Validators.pattern('^[0-9]{1,6}')]],
    complemento: ['', [Validators.pattern(/^([a-zA-Z]{1,}[a-zA-Z]{1,}'?-?[a-zA-Z]\s?([a-zA-Z]{1,})?)/)]],
    condominio: ['', [Validators.pattern(/^([a-zA-Z]{1,}[a-zA-Z]{1,}'?-?[a-zA-Z]\s?([a-zA-Z]{1,})?)/)]],
    bairro: ['', [Validators.pattern(/^([a-zA-Z]{1,}[a-zA-Z]{1,}'?-?[a-zA-Z]\s?([a-zA-Z]{1,})?)/)]],
    municipio: ['', [Validators.pattern(/^([a-zA-Z]{1,}[a-zA-Z]{1,}'?-?[a-zA-Z]\s?([a-zA-Z]{1,})?)/)]],
    estado: [''],
    cep: ['', [Validators.pattern(/^(\d{5}|\d{5}\-?\d{3})$/)] // aceita traço
  ],
  });

  observacoes  = this._formBuilder.group({
    observacao: [''],
  });

  // EXECUTA QUANDO O COMPONENTE É CARREGADO
  ngOnInit(): void {
    // converter STRING => NUMBER.
    this.converterStringToNumber(this.parametro);

    // busca automática ao iniciar o componente
    this.buscarId(this.cliente.idCliente);
    this.buscarEstados();
  }

  // CONVERSOR
  converterStringToNumber(parametro: string): void {
    console.log(typeof parametro);

    // cliente recebe o id já convertido em NUMBER
    this.cliente.idCliente = +parametro;

    console.log(typeof this.cliente.idCliente);
  }

  // BUSCAR ID
  buscarId(idCliente: number): void {
    this.clientesService.buscarId(idCliente).subscribe({
      next: cliente => {
        this.cliente = cliente;

        if(this.cliente.foto){
          this.imagem = 'data:image/jpeg;base64,' + this.cliente.foto;
        }

        if(this.cliente.endereco != null){
          this.enderecoGet = this.cliente.endereco;
        }
      },
      error: e => {
        console.log(e.error);
        const msg: string = "Erro obtendo o cliente.";
        this.snackBar.open(msg, "Erro", { duration: 5000 });
      }
    })
  }

  //Recebendo um evento/valor do componente FILHO para Atualizar
  onUpload(evento) {

    this.step.stepControl.status = "VALID";

    if (evento == 'cancelar') {

      console.log(this.step.stepControl.status);
      console.log("Cancelar");

    } else if (evento == 'erro') {

      this.step.stepControl.status = "INVALID";
      console.log("Erro");

      console.log(this.step.stepControl.status);

    } else {

      this.foto = evento;
      this.step.stepControl.status = "VALID";

      console.log('Arquivo recebido:', this.foto, typeof evento);
    }
  }

  // ATUALIZAR
  atualizar(): void {

    this.formPut(this.dados.value, this.contatos.value, this.endereco.value, this.observacoes.value);

    // converte o clientePut(JSON) em uma String
    var dadosCliente = JSON.stringify(this.clientePut);

    this.clientesService.atualizar(dadosCliente, this.foto).subscribe({
      next: result => {
        this.onSuccess(result)
      },
      error: e => {
        this.onError(e)
      }
    });
  }

  // BUSCAR ESTADOS
  buscarEstados(): void{
    this.estadosService.buscarEstados().subscribe({
      next: result => {
        this.estados = result;
      },
      error: e => {
        this.snackBar.open('Erro ao buscar os estados brasileiros.', '', { duration: 5000 });
      }
    })
  }

  formPut(
    value: Partial<{nome: string; cpf: string; dataNascimento: string; }>,
    value1: Partial<{ telefone1: string; telefone2: string; email: string; }>,
    value2: Partial<{ logradouro: string; numero: string; complemento: string; condominio: string; bairro: string; municipio: string; estado: string; cep: string; }>,
    value3: Partial<{ observacao: string; }>
    ) {

    this.clientePut.idCliente = this.cliente.idCliente;
    this.clientePut.nome = value.nome;
    this.clientePut.dataNascimento = value.dataNascimento;
    this.clientePut.telefone1 = value1.telefone1;
    this.clientePut.telefone2 = value1.telefone2;
    this.clientePut.email = value1.email;
    this.clientePut.logradouro = value2.logradouro;
    this.clientePut.numero = value2.numero;
    this.clientePut.complemento = value2.complemento;
    this.clientePut.condominio = value2.condominio;
    this.clientePut.bairro = value2.bairro;
    this.clientePut.municipio = value2.municipio;
    this.clientePut.estado = value2.estado;
    this.clientePut.cep = value2.cep;
    this.clientePut.observacao = value3.observacao;
  }

  private onSuccess(result: Cliente) {
    this.alertService.success('Cliente ' + result.nome+ ' atualizado(a) com sucesso');
    this.router.navigate(['clientes/cliente-detalhes/'+ result.idCliente]);
  }

  private onError(e: any) {
    this.alertService.error(e.error.message);
    this.router.navigate(['clientes/cliente-update/' + this.cliente.idCliente]);
  }

  getErrorMessage(fieldName: string) {
    console.log(fieldName);

    const dados = this.dados.get(fieldName);
    const contatos = this.contatos.get(fieldName);
    const endereco = this.endereco.get(fieldName);
    const observacoes = this.observacoes.get(fieldName);

    if (dados?.hasError('required') || contatos?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (dados?.hasError('pattern') || contatos?.hasError('pattern')
      || endereco?.hasError('pattern')) {

      if(fieldName == 'cpf'){
        console.log(fieldName);
        return 'O cpf deve conter no mínimo 11 caracteres numéricos';
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

      return 'Informe nome e sobrenome';
    }

    return 'Campo Inválido';
  }

}
