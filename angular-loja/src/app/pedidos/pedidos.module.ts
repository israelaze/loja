import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { PedidosCadComponent } from './components/pedidos-cad/pedidos-cad.component';
import { PedidosListComponent } from './components/pedidos-list/pedidos-list.component';
import { PedidosRoutingModule } from './pedidos-routing.module';
import { CatalogoComponent } from './components/catalogo/catalogo.component';


@NgModule({
  declarations: [
    PedidosListComponent,
    PedidosCadComponent,
    CarrinhoComponent,
    CatalogoComponent
  ],
  imports: [
    CommonModule,
    PedidosRoutingModule,
    SharedModule,
  ]
})
export class PedidosModule { }
