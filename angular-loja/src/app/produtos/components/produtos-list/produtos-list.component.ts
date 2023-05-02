import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Produto } from '../../models/produto';
import { ProdutosService } from '../../services/produtos.service';
import { AlertService } from 'src/app/util/services/alert.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-produtos-list',
  templateUrl: './produtos-list.component.html',
  styleUrls: ['./produtos-list.component.scss']
})
export class ProdutosListComponent implements OnInit {

  dataSource = new MatTableDataSource<Produto>;
  displayedColumns: string[] = ['codigo', 'nome', 'descricao', 'peso', 'acoes'];
  produtos: Produto[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private produtoService: ProdutosService,
    private snackBar: MatSnackBar,
    private alertService: AlertService,
    private dialog: MatDialog)
  { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.buscarTodos();
  }

  // BUSCAR TODOS
  buscarTodos(): void {
    this.produtoService.buscarTodos()
      .subscribe({
        next: produtos => {
          this.produtos = produtos;
          this.dataSource = new MatTableDataSource<Produto>(this.produtos);
          this.dataSource.paginator = this.paginator;
        },
        error: e => {
          console.log(e.error);
          const msg: string = "Erro obtendo produtos.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
    })
  }

  // EXCLUIR
  excluir(produto: Produto) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja excluir ' + produto.nomeProduto + ' ?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.produtoService.excluir(produto.idProduto).subscribe({
          next: result => {
            this.ngOnInit();
            this.alertService.success('Produto ' + produto.nomeProduto + ' removido(a) com sucesso');
          },
          error: e => {
            this.alertService.error('Não é possível excluir o produto ' + produto.nomeProduto + ' pois ele pertence a um ou mais pedidos cadastrados.', 'Erro',);
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
