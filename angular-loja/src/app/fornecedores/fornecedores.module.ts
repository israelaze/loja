import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { FornecedoresCadComponent } from './components/fornecedores-cad/fornecedores-cad.component';
import { FornecedoresListComponent } from './components/fornecedores-list/fornecedores-list.component';
import { FornecedoresRoutingModule } from './fornecedores-routing.module';


@NgModule({
  declarations: [
    FornecedoresListComponent,
    FornecedoresCadComponent
  ],
  imports: [
    CommonModule,
    FornecedoresRoutingModule,
    SharedModule
  ]
})
export class FornecedoresModule { }
