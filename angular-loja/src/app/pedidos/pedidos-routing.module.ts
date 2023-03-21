import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidosCadComponent } from './components/pedidos-cad/pedidos-cad.component';
import { PedidosListComponent } from './components/pedidos-list/pedidos-list.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'pedidos-lista'},

  { path: 'pedidos-lista', component: PedidosListComponent},
  { path: 'adicionar-pedido', component: PedidosCadComponent },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
