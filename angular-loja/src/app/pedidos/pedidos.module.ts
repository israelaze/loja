import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { PedidosListComponent } from './components/pedidos-list/pedidos-list.component';
import { PedidosRoutingModule } from './pedidos-routing.module';


@NgModule({
  declarations: [
    PedidosListComponent,
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
