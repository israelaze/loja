import { VendedoresListComponent } from './components/vendedores-list/vendedores-list.component';
import { VendedoresCadComponent } from './components/vendedores-cad/vendedores-cad.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendedoresRoutingModule } from './vendedores-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    VendedoresCadComponent,
    VendedoresListComponent
  ],
  imports: [
    CommonModule,
    VendedoresRoutingModule,
    SharedModule
  ]
})
export class VendedoresModule { }
