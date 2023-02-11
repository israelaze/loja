import { ClientesListComponent } from './../clientes-list/clientes-list.component';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dialog-excluir',
  templateUrl: './dialog-excluir.component.html',
  styleUrls: ['./dialog-excluir.component.scss']
})
export class DialogExcluirComponent {

  constructor(private router: Router) { }

  excluir(): void {
  }
}
