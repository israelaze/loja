import { animate, state, style, transition, trigger } from '@angular/animations';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/clientes/models/cliente';
import { ClientesService } from 'src/app/clientes/services/clientes.service';
import { Pedido } from 'src/app/pedidos/models/pedido';
import { PedidosService } from './../../../pedidos/services/pedidos.service';


@Component({
  selector: 'app-cliente-detalhes',
  templateUrl: './cliente-detalhes.component.html',
  styleUrls: ['./cliente-detalhes.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ClienteDetalhesComponent implements OnInit{

  // tabela PEDIDOS
  dataSource = new MatTableDataSource<Pedido>;
  columnsToDisplay = ['numeroPedido', 'vendedor', 'dataPedido', 'dataEntrega', 'desconto', 'total', 'situacao'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Pedido | null;

  // tabela ÍTENS DO PEDIDO
  displayedColumns: string[] = ['codigo', 'produto', 'descricao', 'peso', 'quantidade', 'preco', 'subtotal'];

  cliente: Cliente = new Cliente;
  listaPedidos: Pedido[] = [];

  //atributo para guardar o parâmetro recebido na rota
  parametro = this.route.snapshot.paramMap.get('id');

  foto: string;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private clientesService: ClientesService, private pedidosService: PedidosService,
    private _liveAnnouncer: LiveAnnouncer, private snackBar: MatSnackBar, private ref: ChangeDetectorRef,
    private route: ActivatedRoute, private sanitizer: DomSanitizer, private router: Router
  ){}

  // EXECUTA QUANDO O COMPONENTE É CARREGADO
  ngOnInit(): void {
    //converter STRING => NUMBER.
    this.converterStringToNumber(this.parametro);

    this.buscarId(this.cliente.idCliente);
    this.buscarPedidosByCliente(this.cliente.idCliente);

  }

  // CONVERSOR
  converterStringToNumber(parametro: string): void {
    console.log(typeof parametro);

    // Cliente recebe o id já convertido em NUMBER
    this.cliente.idCliente = +parametro;
    console.log(typeof this.cliente.idCliente);
  }

  // BUSCAR ID
  buscarId(idCliente: number): void {
    this.clientesService.buscarId(idCliente).subscribe({
      next: cliente => {

        this.cliente = cliente;

        if(this.cliente.foto){
          this.foto = 'data:image/jpeg;base64,' + this.cliente.foto;
        }
      },
      error: e => {
        console.log(e.error.message);
        this.router.navigate(['clientes/clientes-lista']);

        const msg: string = e.error.message;
        this.snackBar.open(msg, "Erro", { duration: 5000 });
      }
    })
  }

   // BUSCAR PEDIDOS
   buscarPedidosByCliente(idCliente: number): void {
    this.pedidosService.buscarPedidosByCliente(idCliente).subscribe({
      next: result => {

        this.listaPedidos = result;

        // this.listaPedidos.forEach(function (pedido) {

        //   // recebendo um lista de ítens de cada pedido
        //   const itens = pedido.itens;
        // });

        this.dataSource = new MatTableDataSource<Pedido>(this.listaPedidos);
        this.ref.detectChanges();
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: e => {
        console.log(e.error);
        const msg: string = "Erro obtendo pedidos.";
        this.snackBar.open(msg, "Erro", { duration: 5000 });
      }
    })
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  // FILTRO
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  novoPedido(){
    // limpa a sessão
    sessionStorage.clear();
    //navegação
    this.router.navigate(['/pedidos/adicionar-pedido/cliente/'+ this.cliente.idCliente]);
  }

  // Botão voltar à página anterior
  voltar(){
    history.go(-1);
  }

}
