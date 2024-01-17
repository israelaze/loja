import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/clientes/models/cliente';
import { AlertService } from 'src/app/util/services/alert.service';
import { ClientesService } from '../../services/clientes.service';
import { ConfirmationDialogComponent } from './../../../shared/components/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.scss']
})
export class ClientesListComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource<Cliente>;
  displayedColumns: string[] = ['nome', 'endereco', 'acoes'];
  clientes: Cliente[] = [];
  cliente: Cliente = new Cliente;
  mensagem = '';

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private clientesService: ClientesService,
    private snackBar: MatSnackBar,
    private _liveAnnouncer: LiveAnnouncer,
    private alertService: AlertService,
    public dialog: MatDialog
    )
  { }

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

  // EXECUTA QUANDO O COMPONENTE É CARREGADO
  ngOnInit(): void {
    this.buscarTodos();
  }

  // BUSCAR TODOS
  buscarTodos(): void {
    this.clientesService.buscarTodos().subscribe({
      next: clientes => {

        if(clientes.length == 0){

          console.log("sem clientes");
          this.mensagem = 'Nenhum cliente cadastrado!';

        }else{

          this.clientes = clientes;
          this.dataSource = new MatTableDataSource<Cliente>(this.clientes);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      },
      error: e => {
        console.log(e.error);
        const msg: string = "Erro obtendo clientes.";
        this.snackBar.open(msg, "Erro", { duration: 5000 });
      }
    })
  }

  // EXCLUIR
  excluir(cliente: Cliente) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja excluir ' + cliente.nome + ' ?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.clientesService.excluir(cliente.idCliente).subscribe({
          next: result => {
            this.ngOnInit();
            this.alertService.success('Cliente ' + cliente.nome + ' removido(a) com sucesso');
          },
          error: e => {
            this.alertService.error('Não é possível excluir o(a) cliente ' + cliente.nome +' pois ele(a) possui um ou mais pedidos cadastrados.', 'Erro', )
          }
        });
      }
    });
  }

  // FILTRO
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
