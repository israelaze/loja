import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { PedidosCadComponent } from './components/pedidos-cad/pedidos-cad.component';
import { PedidosListComponent } from './components/pedidos-list/pedidos-list.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { PedidosRoutingModule } from './pedidos-routing.module';


@NgModule({
  declarations: [
    PedidosListComponent,
    PedidosCadComponent,
    CarrinhoComponent,
    PedidosComponent
  ],
  imports: [
    CommonModule,
    PedidosRoutingModule,
    SharedModule
  ]
})
export class PedidosModule { }
