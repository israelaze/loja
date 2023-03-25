import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { PedidosListComponent } from './components/pedidos-list/pedidos-list.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'pedidos-lista'},

  { path: 'pedidos-lista', component: PedidosListComponent},
  { path: 'adicionar-pedido', component: CatalogoComponent },
  { path: 'adicionar-pedido/cliente/:id', component: CatalogoComponent },
  { path: 'carrinho', component: CarrinhoComponent },


 // { path: 'adicionar-pedido', component: PedidosCadComponent },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
