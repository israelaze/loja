import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/clientes/models/cliente';
import { ClientesService } from 'src/app/clientes/services/clientes.service';

@Component({
  selector: 'app-pedidos-cad',
  templateUrl: './pedidos-cad.component.html',
  styleUrls: ['./pedidos-cad.component.scss']
})
export class PedidosCadComponent implements OnInit, AfterViewInit{

  dataSource = new MatTableDataSource<Cliente>;
  displayedColumns: string[] = ['nome', 'endereco', 'acoes'];

  clientes: Cliente[] = [];
  opcaoBusca = '';
  valor = '';
  foto = '';

  form: FormGroup;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private formBuilder: FormBuilder,
    private clienteService: ClientesService,
    private snackBar: MatSnackBar,
    private _liveAnnouncer: LiveAnnouncer,
    private ref: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.buscarTodos();
    this.criarForm();
  }

  criarForm(){
    this.form  = this.formBuilder.group({
      opcao: [''],
      nome: [''],
      cpf: [''],
      telefone: [''],
      email: ['']
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  // FILTRO DA BUSCA
  escolha(): string{

    this.opcaoBusca = '';

    if(this.form.value.opcao != ''){
      this.opcaoBusca = this.form.value.opcao;
    }

    if(this.opcaoBusca == 'nome'){
      this.valor = this.form.value.nome;
    }else if(this.opcaoBusca == 'cpf'){
      this.valor = this.form.value.cpf;
    }else if(this.opcaoBusca == 'telefone'){
      this.valor = this.form.value.telefone;
    }else{
      this.valor = this.form.value.email;
    }

    console.log(this.valor);
    return this.opcaoBusca;
  }

  // BUSCAR TODOS
  buscarTodos(): void {
    this.clienteService.buscarTodos().subscribe({
      next: clientes => {
        this.clientes = clientes;
      },
      error: e => {
        console.log(e.error);
        const msg: string = "Erro obtendo clientes.";
        this.snackBar.open(msg, "Erro", { duration: 5000 });
      }
    })
  }

  // BUSCAR CLIENTE NA LISTA
  buscarCliente(){

    console.log('Opção:', this.opcaoBusca);
    console.log('Valor:', this.valor);

    let result: Cliente[] = [];

    if(this.valor != ''){

      switch (this.opcaoBusca) {

        case 'nome':
          this.clientes.forEach(element => {

            // trim().toLowerCase() => todas as letras em minúsculas
            if(element.nome.trim().toLowerCase().includes(this.valor.trim().toLowerCase())){
              result.push(element);
            }
          });
        break;

        case 'cpf':
          this.clientes.forEach(element => {

            if(element.cpf == this.valor){
              result.push(element);
              return;
            }
          });
        break;

        case 'telefone':
          this.clientes.forEach(element => {

            if(element.telefone1 == this.valor){
              result.push(element);
              return;
            }
          });
        break;

        case 'email':
          this.clientes.forEach(element => {

            if(element.email == this.valor){
              result.push(element);
              return;
            }
          });
        break;

        default:
        break;
      };

      this.dataSource = new MatTableDataSource<Cliente>(result);
      this.ref.detectChanges();
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      if(result.length > 0){
        console.log('Qtde de clientes encontrados:', result.length);
        console.log('Resultado da busca:', result);

      }else{
        console.log('Não encontrado');
        this.snackBar.open('Cliente não encontrado', 'ERRO',  { duration: 4000 });
      }
    }

  }

  // FILTRO
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
      console.log(this.dataSource);

    }
  }


  // Botão voltar à página anterior
  voltar(){
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
